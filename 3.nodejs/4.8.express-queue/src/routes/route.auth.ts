import express from "express";
import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { registerSchema } from "../validators/auth.validator";
import { socialAuthController } from "../controllers/socialAuth.controller";
const router = express.Router();
router.post('/auth/login', authController.login);
router.post('/auth/register', validate(registerSchema), authController.register);
router.get('/auth/me', authMiddleware, authController.profile);
router.delete('/auth/logout', authMiddleware, authController.logout)
router.post('/auth/refresh-token', authController.refreshToken);
router.get('/auth/devices', authMiddleware, authController.devices);
router.delete('/auth/devices/:id', authMiddleware, authController.logoutDevice);
router.delete('/auth/devices', authMiddleware, authController.logoutAllDevice);
router.post('/auth/active', authController.active);

//Google
router.get('/auth/google', socialAuthController.google);
router.get('/auth/google/callback', socialAuthController.googleCallback);
router.post('/auth/google/login', socialAuthController.googleLogin);
export default router;