import { Router } from "express";
import multer from "multer";

import LoginController from "../controller/Api/Auth/Login";
import LogoutController from "../controller/Api/Auth/Logout";
import RegisterController from "../controller/Api/Auth/Register";
import ImageController from "../controller/Api/Image/Image";
import { parseUserAuthCookie, tryParseUserAuthCookie } from "../middleware/Auth";
import fs from 'fs';

import Locals from "../provider/Local";

import HomeController from "../controller/Home";

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // @ts-ignore
        const userId = req.user?.id;
        const dir = `uploads/${userId}/`;

        // Create the directory if it does not exist
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
    
        cb(null, dir);
      },
      filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
      }
});

const upload = multer({
//   dest: "uploads/",
  limits: {
    fileSize: 1024 * 1024 * 10,
    fields: 2,
  },
  fileFilter(req, file, cb) {
    // 只接受三種圖片格式
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(new Error("Please upload an image"));
    }
    cb(null, true);
  },
  storage: storage
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
router.delete("/image/delete", 
parseUserAuthCookie,
ImageController.delete);
router.post("/image/update", 
parseUserAuthCookie,
ImageController.update);

router.get("/image/:imageId",
tryParseUserAuthCookie,
ImageController.get);

export default router;
