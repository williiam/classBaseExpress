import { Router } from 'express';
import expressJwt from 'express-jwt';
import LoginController from '../controller/Api/Auth/Login';
import LogoutController from '../controller/Api/Auth/Logout';
import RegisterController from '../controller/Api/Auth/Register';
import ImageController from '../controller/Api/Image/Image';

import Locals from '../provider/Local';

import HomeController from '../controller/Home';

const router = Router();

router.get('/', HomeController.index);


router.post('/auth/register',RegisterController.perform);
router.post('/auth/login', LoginController.perform);

// router.post('/image/new', ImageController.new);
// router.post('/image/delete', HomeController.index);
// router.post('/image/list', HomeController.index);
// router.post('/image/update', HomeController.index);

export default router;
