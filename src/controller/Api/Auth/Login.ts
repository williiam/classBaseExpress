import { RequestHandler } from "express";
import { check, validationResult } from "express-validator";
import { IRequest, IResponse, INext } from "../../../interface/vendors";
import Log from "../../../provider/Log";
import { Database } from "../../../provider/Database";
import { IUser } from "../../../interface/models";
import { hash, compare } from "../../../util";
import User, { UserUtil } from "../../../interface/models/user";

class Login {
  public static show: RequestHandler<IRequest, Partial<IResponse>> = (
    req,
    res
  ) => {
    return res.render("pages/login", {
      title: "LogIn",
    });
  };

  public static async perform(req: IRequest, res: IResponse, next: INext): any {
    check("email", "E-mail cannot be blank").notEmpty();
    check("email", "E-mail is not valid").isEmail();
    check("password", "Password cannot be blank").notEmpty();
    check("password", "Password length must be atleast 8 characters").isLength({
      min: 8,
    });
    // sanitize body

    const validResult = validationResult(req);
    if (!validResult.isEmpty()) {
      return res.status(400).json({ errors: validResult.array() });
    }

    const { email, password } = req.body;
    console.log({ email, password });
	const result = await Database.pool.query(
        "SELECT email, password_hash FROM users WHERE email = $1",
        [email]
      );
      const selectUser: IUser = result.rows[0];

      if (selectUser) {
        const passwordHash = await hash(password);
        // Compare the input password to the hashed password in the database
        const passwordMatches = await compare(
          passwordHash,
          selectUser.password_hash
        );

		if (passwordMatches) {
			// generate jwt
			const jwt = UserUtil.generateJwt(selectUser);

			return res.status(200).json({
				error: false,
				message: "Login successful",
				accessToken: jwt,
			});
		}
	}
	return res.status(400).json({
		error: true,
		message: "Invalid credentials",
	});
  }

  // check jwt middleware
  public static checkJwt(req: IRequest, res: IResponse, next: INext): any {
    Log.info("Checking JWT");
    next();
  }
}

export default Login;
