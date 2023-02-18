import { RequestHandler } from 'express';
import { check, validationResult } from 'express-validator';
import {
	IRequest, IResponse, INext
} from '../../../interface/vendors';
import Log from '../../../provider/Log';
import { Database } from '../../../provider/Database';
import { IUser } from '../../../interface/models';
import { hash,compare } from "../../../util";

class Login {
	public static show: RequestHandler<IRequest,Partial<IResponse>> = (req, res) => {
		return res.render('pages/login', {
			title: 'LogIn'
		});
	}

	public static perform (req: IRequest, res: IResponse, next: INext): any {
		check('email', 'E-mail cannot be blank').notEmpty();
		check('email', 'E-mail is not valid').isEmail();
		check('password', 'Password cannot be blank').notEmpty();
		check('password', 'Password length must be atleast 8 characters').isLength({ min: 8 });
		// sanitize body

		const result = validationResult(req);
		if (!result.isEmpty()) {
		  return res.status(400).json({ errors: result.array() });
		}

		const { email, password } = req.body;
		console.log({email, password});
		
		// check user exist and password match
		const query = `SELECT * FROM users WHERE email = $1`;
		const values = [email];


			


	}

	private checkCredentials = async (email: string, password: string): Promise<boolean> => {
		try {
		  // Get the user with the given email from the database
		  const result = await Database.pool.query('SELECT email, password_hash FROM users WHERE email = $1', [email]);
		  const user: IUser = result.rows[0];
	  
		  if (user) {

			const passwordHash = await hash(password);
			// Compare the input password to the hashed password in the database
			const passwordMatches = await compare(passwordHash, user.password_hash);
			return passwordMatches;
		  } else {
			return false;
		  }
		} catch (error) {
		  console.error('Error checking credentials:', error);
		  return false;
		} finally {
		  pool.end();
		}
	  }

	// check jwt middleware
	public static checkJwt (req: IRequest, res: IResponse, next: INext): any {
		Log.info('Checking JWT');
		next();
	}
}

export default Login;
