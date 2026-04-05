import express from "express";
import { homeController } from "../controllers/home.controller";
import userRouter from "./users";
import { authMiddleware } from "../middlewares/auth.middleware";
const router = express.Router();
router.get("/", homeController.index);
router.use("/users", authMiddleware, userRouter);
export default router;
