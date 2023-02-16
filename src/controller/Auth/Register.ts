import { RequestHandler } from 'express';
import { check, validationResult } from 'express-validator';
import { IRequest, IResponse } from '../../interface/vendors';

class Register {

	public static show: RequestHandler<IRequest,Partial<IResponse>> = (req, res) => {
		return res.render('pages/signup', {
			title: 'SignUp'
		});
	}

	public static perform: RequestHandler<IRequest,Partial<IResponse>> =  (req, res) => {
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

		// const user = new User({
		// 	email: _email,
		// 	password: _password
		// });

		// User.findOne({ email: _email }, (err, existingUser) => {
		// 	if (err) {
		// 		return res.json({
		// 			error: err
		// 		});
		// 	}

		// 	if (existingUser) {
		// 		return res.json({
		// 			error: ['Account with the e-mail address already exists.']
		// 		});
		// 	}

		// 	user.save((err) => {
		// 		if (err) {
		// 			return res.json({
		// 				error: err
		// 			});
		// 		}

		// 		return res.json({
		// 			message: ['You have been successfully registered with us!']
		// 		});
		// 	});
		// });
	}
}

export default Register;
