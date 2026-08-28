import express, { Request, Response } from "express";
import productRouter from "./route.product";
import authRouter from "./route.auth";
const router = express.Router();
router.get('/', (req: Request, res: Response) => {
    res.json({})
});

router.use(productRouter);
router.use(authRouter)

export default router;