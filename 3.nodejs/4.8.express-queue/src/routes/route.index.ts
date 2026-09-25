import express, { Request, Response } from "express";
import productRouter from "./route.product";
import authRouter from "./route.auth";
import adminRouter from "./route.admin";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { videoController } from "../validators/video.controller";
const router = express.Router();
router.get('/', (req: Request, res: Response) => {
    res.json({})
});

router.use(productRouter);
router.use(authRouter)
router.use('/admin', authMiddleware, adminMiddleware, adminRouter);

router.get('/videos', videoController.findAll);
router.post('/videos', videoController.create);

export default router;