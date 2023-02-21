import cookie from "cookie";
import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import { IRequest, IResponse } from "../interface/vendors";
import Locals from "../provider/Local";
import { INext } from "../interface/vendors/INext";

export const parseUserAuthCookie: RequestHandler<
  IRequest,
  Partial<IResponse>,
  INext
> = (req, res, next) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies.user;
  if (token) {
    const jwtSalt = Locals.config().jwtSalt;
    const user = jwt.verify(
      token,
      jwtSalt,
      { complete: true },
      (err, decoded) => {
        if (err) {
        //   console.log("Token is invalid");
          return err;
        } else {
        //   console.log("Token is valid");
          // @ts-ignore
          return decoded.payload;
        }
      }
    );
    // @ts-ignore
    if (user instanceof Error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // @ts-ignore
    req.user = user;
    next();
    return;
  }
  return res.status(401).json({ message: "Unauthorized" });
};

export const tryParseUserAuthCookie: RequestHandler<
  IRequest,
  Partial<IResponse>,
  INext
> = (req, res, next) => {
  const cookies = cookie.parse(req.headers.cookie || "");
  const token = cookies?.user;
  if (token) {
    const jwtSalt = Locals.config().jwtSalt;
    const user = jwt.verify(
      token,
      jwtSalt,
      { complete: true },
      (err, decoded) => {
        if (err) {
        //   console.log("Token is invalid");
          return err;
        } else {
        //   console.log("Token is valid");
          // @ts-ignore
          return decoded.payload;
        }
      }
    );
    // @ts-ignore
    if (!(user instanceof Error)) {
      // @ts-ignore
      req.user = user;
    }
  }
  next();
  return;
};
