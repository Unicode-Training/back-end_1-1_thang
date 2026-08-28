import express from "express";
import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
const router = express.Router();
router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);
router.get('/auth/me', authMiddleware, authController.profile);
router.delete('/auth/logout', authMiddleware, authController.logout)
export default router;