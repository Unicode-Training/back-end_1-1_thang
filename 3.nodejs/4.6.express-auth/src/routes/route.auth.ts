import express from "express";
import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
const router = express.Router();
router.post('/auth/login', authController.login);
router.post('/auth/register', authController.register);
router.get('/auth/me', authMiddleware, authController.profile);
router.delete('/auth/logout', authMiddleware, authController.logout)
router.post('/auth/refresh-token', authController.refreshToken);
router.get('/auth/devices', authMiddleware, authController.devices);
router.delete('/auth/devices/:id', authMiddleware, authController.logoutDevice);
router.delete('/auth/devices', authMiddleware, authController.logoutAllDevice);
export default router;