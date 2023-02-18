import { RequestHandler } from "express";
import { check, validationResult } from "express-validator";
import { IRequest, IResponse, INext } from "../../../interface/vendors";
import Log from "../../../provider/Log";
import { Database } from "../../../provider/Database";
import { hash, compare } from "../../../util";
import User from "../../../interface/models/user";
import { UserUtil } from "../../../util/user";

class Login {
  public static show: RequestHandler<IRequest, Partial<IResponse>> = (
    req,
    res
  ) => {
    return res.render("pages/login", {
      title: "LogIn",
    });
  };

  public static perform: RequestHandler<IRequest, Partial<IResponse>> = async (
    req,
    res,
    next
  ) => {
    try {
      await check("email", "E-mail cannot be blank").notEmpty().run(req);
      await check("email", "E-mail is not valid").isEmail().run(req);
      await check("password", "Password cannot be blank").notEmpty().run(req);
      await check("password", "Password length must be atleast 8 characters")
        .isLength({
          min: 8,
        })
        .run(req);
      // sanitize body

      const validResult = validationResult(req);
      if (!validResult.isEmpty()) {
        return res.status(400).json({ errors: validResult.array() });
      }

      const { email, password } = req.body;
      console.log({ email, password });
      const result = await Database.pool.query(
        "SELECT email, password FROM users WHERE email = $1",
        [email]
      );
      const selectUser: User = result.rows[0];

      let passwordMatches = false;
      if (selectUser) {
        passwordMatches = await compare(password, selectUser.password);

        if (passwordMatches) {
          // generate jwt
          const jwt = await UserUtil.generateJwt({
            id: selectUser.id,
            email: selectUser.email,
          });

          // Set the JWT as a cookie
          res.cookie('user', jwt, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            secure: true,
            sameSite: 'none'
          });
          return res.status(200).json({
            error: false,
            message: "Login successful",
            accessToken: jwt,
          });
        }
      }

      let message = "Invalid credentials";
      if (!selectUser) {
        message = "user not exist";
      }

      if (!passwordMatches) {
        message = "password not match";
      }

      return res.status(400).json({
        error: true,
        message,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // check jwt middleware
  public static checkJwt(req: IRequest, res: IResponse, next: INext): any {
    Log.info("Checking JWT");
    next();
  }
}

export default Login;
