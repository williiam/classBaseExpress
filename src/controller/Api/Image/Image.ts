import { RequestHandler } from "express";
import { check, validationResult } from "express-validator";
import { IRequest, IResponse } from "../../../interface/vendors";
import { Database } from "../../../provider/Database";

class Image {

  public static new: RequestHandler<IRequest, Partial<IResponse>> = async (
    req,
    res
  ) => {
    check("name", "Password cannot be blank").notEmpty();
    check("isPrivate", "Password length must be atleast 8 characters").notEmpty();
    if (!req.file) {
      return res.status(400).json({
        error: true,
        message: "No file uploaded",
      });
    }

    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    // @ts-ignore
    const { user, file, body } = req;
    const { name, isPrivate } = body;
   
  };
}

export default Image;
