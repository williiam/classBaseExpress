/**
 * Define the API base url
 *
 * @author Faiz A. Farooqui <faiz@geekyants.com>
 */

import { NextFunction, RequestHandler } from 'express';
import { IRequest, IResponse } from '../../interface/vendors';
import Locals from '../../provider/Local';

class Home {
	public static index: RequestHandler<IRequest,Partial<IResponse>> = (req, res, next) => {
		return res.json({
			message: Locals.config().name
		});
	}
}

export default Home;
