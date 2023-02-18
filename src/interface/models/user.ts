/**
 * Define interface for User Model
 *
 * @author Faiz A. Farooqui <faiz@geekyants.com>
 */

export interface Tokens {
  kind: string;
  accessToken: string;
  tokenSecret?: string;
}

type CammelCaseUser = {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
};

type UnderscoreCaseUser = {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
};

// User is the interface for User model
type User = CammelCaseUser & UnderscoreCaseUser;

export class UserUtil {
  public static toCammelCase(user: CammelCaseUser & UnderscoreCaseUser): CammelCaseUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      passwordHash: user.password_hash || user.passwordHash,
      createdAt: user.created_at || user.createdAt,
    };
  }

  public static toUnderscoreCase(user: CammelCaseUser & UnderscoreCaseUser): UnderscoreCaseUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password_hash: user.password_hash || user.passwordHash,
      created_at: user.created_at || user.createdAt,
    };
  }
}

export default User;
