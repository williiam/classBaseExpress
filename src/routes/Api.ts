import { Router } from "express";
import expressJwt from "express-jwt";
import multer from "multer";

import LoginController from "../controller/Api/Auth/Login";
import LogoutController from "../controller/Api/Auth/Logout";
import RegisterController from "../controller/Api/Auth/Register";
import ImageController from "../controller/Api/Image/Image";

import { parseUserAuthCookie } from "../middleware/Auth";

import Locals from "../provider/Local";

import HomeController from "../controller/Home";

const upload = multer({
  dest: "uploads/",
  limits: {
    fileSize: 1024 * 1024 * 10,
    fields:2
  },
  fileFilter(req, file, cb) {
    // 只接受三種圖片格式
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(new Error("Please upload an image"));
    }
    cb(null, true);
  },
});

const router = Router();

router.get("/", HomeController.index);

router.post("/auth/register", RegisterController.perform);
router.post("/auth/login", LoginController.perform);

router.post(
  "/image/new",
  parseUserAuthCookie,
  // @ts-ignore
  upload.single("file"),
  ImageController.new
);
router.delete('/image/delete', ImageController.delete);
router.post('/image/update', ImageController.update);

router.get('/image/list', ImageController.getList);

export default router;
