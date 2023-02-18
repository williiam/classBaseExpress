import { RequestHandler } from "express";
import { check, validationResult } from "express-validator";
import { IRequest, IResponse } from "../../../interface/vendors";
import { User } from "../../../interface/models";
import { Database } from "../../../provider/Database";
import { hash } from "../../../util";
import { UserUtil } from "../../../util/user";

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
    try {
      await check("email", "E-mail cannot be blank").notEmpty().run(req);
      await check("email", "E-mail is not valid").isEmail().run(req);
      await check("password", "Password cannot be blank").notEmpty().run(req);
      await check(
        "password",
        "Password length must be atleast 8 characters"
      ).isLength({
        min: 8,
      }).run(req);
      await check(
        "confirmPassword",
        "Confirmation Password cannot be blank"
      ).notEmpty().run(req);
      await check(
        "confirmPassword",
        "Password & Confirmation password does not match"
      ).equals(req.body.password).run(req);
      // sanitize body

      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }

      const { email, password } = req.body;

      const insertResult = await this.createNewUser(email, password);

      if (insertResult.rowCount === 1) {
        const insertUser: User = insertResult.rows[0];
        const jwt = await UserUtil.generateJwt(insertUser);
        
        // Set the JWT as a cookie
        res.cookie('user', jwt, {
          httpOnly: true,
          maxAge: 24 * 60 * 60 * 1000, // 1 day
          secure: true,
          sameSite: 'none'
        });
        return res.status(200).json({
          error: false,
          message: "Registration successful",
          accessToken: jwt,
        });
      } else {
        return res.status(400).json({
          error: true,
          message: "Registration failed",
        });
      }
    } catch (error: any) {
      // duplicate key value violates unique constraint "unique_email"'
      if (error?.code === '23505') {
        return res.status(400).json({
          error: true,
          message: "Email already registered",
        });
      }
      throw error;
    }
  };

  // TODO: store password as hash
  private static async createNewUser(
    email: string,
    password: string
  ): Promise<any> {
    try {
      const passwordHash = await hash(password);
      const now = new Date();
      const query = {
        text: "INSERT INTO users(email, password, created_at) VALUES($1, $2, $3) RETURNING id, email;",
        values: [email, passwordHash, now],
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
