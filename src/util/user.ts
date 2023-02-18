import jwt from 'jsonwebtoken';
import { User,CammelCaseUser,UnderscoreCaseUser } from "../interface/models";
import Locals from "../provider/Local";
import bcrypt from "bcrypt";

export class UserUtil {

  // TODO: payload 格式
  /*
    {
        id,
        email
    }
  */
  public static async generateJwt(payload: any) {
    const saltRounds = Locals.config().jwtUserSaltRounds;
    const salt = await bcrypt.genSalt(saltRounds);
    const token = jwt.sign(payload, salt, {
      expiresIn: "1d",
    });
    return token;
  }

  public static toCammelCase(user: User): CammelCaseUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: user.created_at || user.createdAt,
    };
  }

  public static toUnderscoreCase(
    user: CammelCaseUser & UnderscoreCaseUser
  ): UnderscoreCaseUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      created_at: user.created_at || user.createdAt,
    };
  }
}
