import jwt from 'jsonwebtoken';
import { User,CammelCaseUser,UnderscoreCaseUser } from "../interface/models";
import Locals from "../provider/Local";


export class UserUtil {
  public static async generateJwt(payload: any) {
    const saltRounds = Locals.config().jwtUserSaltRounds;
    const token = await jwt.sign(payload, saltRounds, {
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
      passwordHash: user.password_hash || user.passwordHash,
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
      password_hash: user.password_hash || user.passwordHash,
      created_at: user.created_at || user.createdAt,
    };
  }
}
