import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationError } from 'express-validator';

class Validator {
	// Loads your dotenv file
	public loadConfiguration (): void {
		Log.info('Configuration :: Booting @ Master...');

		dotenv.config({ path: path.join(__dirname, '../../.env') });
	}

	// Loads your Server
	public loadServer (): void {
		Log.info('Server :: Booting @ Master...');

		Express.init();
	}

	// Loads the Database Pool
	public validate = (validators: Array<any>) => {
		return async (req: Request, res: Response, next: NextFunction) => {
		  await Promise.all(validators.map((validator) => validator.run(req)));
		  const errors = validationResult(req).formatWith((error: ValidationError) => {
			return {
			  message: error.msg,
			  param: error.param,
			};
		  });
		  if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		  }
		  next();
		};
	};

	
}

export default Validator;
