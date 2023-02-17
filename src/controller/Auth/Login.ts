import { RequestHandler } from 'express';
import { check, validationResult } from 'express-validator';
import {
	IRequest, IResponse, INext
} from '../../interface/vendors';
import Log from '../../provider/Log';

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
		check('confirmPassword', 'Confirmation Password cannot be blank').notEmpty();
		check('confirmPassword', 'Password & Confirmation password does not match').equals(req.body.password);
		// sanitize body

		const result = validationResult(req);
		if (!result.isEmpty()) {
		  return res.status(400).json({ errors: result.array() });
		}

		const { email, password } = req.body;
		console.log({email, password});
	}
}

export default Login;
