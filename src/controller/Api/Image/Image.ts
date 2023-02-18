import { RequestHandler } from "express";
import { check, validationResult } from "express-validator";
import { IRequest, IResponse } from "../../../interface/vendors";
import { Database } from "../../../provider/Database";

class Image {

  public static new: RequestHandler<IRequest, Partial<IResponse>> = async (
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
    console.log({ email, password });
	
    const insertResult = await this.createNewUser({ email, password });

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
  private static async createNewUser(user: IUser): Promise<any> {
    try {
      const now = new Date();
      const query = {
        text: "INSERT INTO users(email, password, created_at) VALUES($1, $2, $3)",
        values: [user.email, user.password, now],
      };
      return await Database.pool.query(query);
    } catch (error) {

	  // TODO: DB error dont go to client 
      console.error("Error inserting user:", error);
      throw error;
    }
  }
}

export default Register;
