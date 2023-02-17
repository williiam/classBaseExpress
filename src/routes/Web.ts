import { RequestHandler, Router } from 'express';

import HomeController from '../controller/Home';
import LoginController from '../controller/Api/Auth/Login';
import LogoutController from '../controller/Api/Auth/Logout';
import SocialController from '../controller/Api/Auth/Social';
import RegisterController from '../controller/Api/Auth/Register';

import { IRequest, IResponse } from '../interface/vendors';


const router = Router();

router.get('/', HomeController.index);

// TODO: validate
router.get('/signup', RegisterController.show);
router.post('/signup',RegisterController.perform);

// router.get('/login', LoginController.show);
// router.post('/login', LoginController.perform);

// router.get('/logout', LogoutController.perform);

export default router;
