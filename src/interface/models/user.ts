
export interface Tokens {
  kind: string;
  accessToken: string;
  tokenSecret?: string;
}

export type CammelCaseUser = {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
};

export type UnderscoreCaseUser = {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
};

// User is the interface for User model
type User = CammelCaseUser & UnderscoreCaseUser | (CammelCaseUser & UnderscoreCaseUser);

export default User;
