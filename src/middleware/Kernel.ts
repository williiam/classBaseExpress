import { Application } from 'express';

import Views from './Views';

class Kernel {
	public static init (_express: Application): Application {

		// Mount view engine middleware
		_express = Views.mount(_express);

		return _express;
	}
}

export default Kernel;
