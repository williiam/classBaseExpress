import { RequestHandler } from 'express';
import { IRequest, IResponse } from '../interface/vendors';

class Home {
	public static index: RequestHandler<IRequest,Partial<IResponse>> = (req, res) => {
		return res.json({
			error: false,
			message: 'Welcome to the API'
		});
	}
}

export default Home;
