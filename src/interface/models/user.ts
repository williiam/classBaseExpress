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

export interface IUser {
	id: number;
	name: string;
	email: string;
	password: string;
	created_at: Date;
  
}

export default IUser;
