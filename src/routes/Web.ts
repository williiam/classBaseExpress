import { RequestHandler, Router } from 'express';

import HomeController from '../controller/Home';
import LoginController from '../controller/Api/Auth/Login';
import LogoutController from '../controller/Api/Auth/Logout';
import RegisterController from '../controller/Api/Auth/Register';

import { IRequest, IResponse } from '../interface/vendors';


const router = Router();

router.get('/', HomeController.index);

export default router;
