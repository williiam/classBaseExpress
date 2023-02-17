/**
 * Define all your API web-routes
 *
 * @author Faiz A. Farooqui <faiz@geekyants.com>
 */

import { Router } from 'express';
import expressJwt from 'express-jwt';

import Locals from '../provider/Local';

import HomeController from '../controller/Api/Home';
// import LoginController from '../controller/Api/Auth/Login';
// import RegisterController from '../controller/Api/Auth/Register';
// import RefreshTokenController from '../controller/Api/Auth/RefreshToken';

const router = Router();

router.get('/', HomeController.index);

// router.post('/auth/login', LoginController.perform);
// router.post('/auth/register', RegisterController.perform);
// router.post('/auth/refresh-token', expressJwt({ secret: Locals.config().appSecret }), RefreshTokenController.perform);

export default router;
