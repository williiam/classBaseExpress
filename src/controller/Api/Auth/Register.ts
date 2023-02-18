import { RequestHandler } from "express";
import { check, validationResult } from "express-validator";
import { IRequest, IResponse } from "../../../interface/vendors";
import { User } from "../../../interface/models";
import { Database } from "../../../provider/Database";
import { hash } from "../../../util";
import { UserUtil } from "../../../interface/models/user";

class Register {
  public static show: RequestHandler<IRequest, Partial<IResponse>> = (
    req,
    res
  ) => {
    return res.render("pages/signup", {
      title: "SignUp",
      messages: {},
    });
  };

  public static perform: RequestHandler<IRequest, Partial<IResponse>> = async (
    req,
    res
  ) => {
    check("email", "E-mail cannot be blank").notEmpty();
    check("email", "E-mail is not valid").isEmail();
    check("password", "Password cannot be blank").notEmpty();
    check("password", "Password length must be atleast 8 characters").isLength({
      min: 8,
    });
    check(
      "confirmPassword",
      "Confirmation Password cannot be blank"
    ).notEmpty();
    check(
      "confirmPassword",
      "Password & Confirmation password does not match"
    ).equals(req.body.password);
    // sanitize body

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const { email, password } = req.body;

    const passwordHash = await hash(password);

    const insertResult = await this.createNewUser({
      email,
      password_hash: passwordHash,
      id: 0,
      name: "",
      created_at: new Date(),
    });

    if (insertResult.rowCount === 1) {
      return res.status(200).json({
        error: false,
        message: "Registration successful",
      });
    } else {
      return res.status(400).json({
        error: true,
        message: "Registration failed",
      });
    }
  };

  // TODO: store password as hash
  private static async createNewUser(user: User): Promise<any> {
    try {
      const newUser = UserUtil.toUnderscoreCase(user);
      const now = new Date();
      const query = {
        text: "INSERT INTO users(email, password_hash, created_at) VALUES($1, $2, $3)",
        values: [user.email, user.password_hash, now],
      };
      const result = await Database.pool.query(query);
      return result;
    } catch (error) {
      // TODO: DB error dont go to client
      console.error("Error inserting user:", error);
      throw error;
    }
  }
}

export default Register;

