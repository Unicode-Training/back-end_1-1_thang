import express from "express";
import { uploadController } from "../controllers/upload.controller";
import { uploadLogo } from "../libs/multer";
const router = express.Router();
router.post('/logo', uploadLogo.single('file'), uploadController.uploadLogo);
export default router;