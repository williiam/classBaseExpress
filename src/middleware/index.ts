import { Application } from 'express';

import Views from './Views';
import Http from './Http';
import Statics from './Statics';
import StatusMonitor from './StatusMonitor';

class Kernel {
	public static init (_express: Application): Application {

		_express = Http.mount(_express);
		_express = Views.mount(_express);
		_express = Statics.mount(_express);
		_express = StatusMonitor.mount(_express);

		return _express;
	}
}

export default Kernel;
