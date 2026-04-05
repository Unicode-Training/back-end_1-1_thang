import express from "express";
import { userController } from "../controllers/user.controller";
const router = express.Router();
router.get("/", userController.index);
router.get("/:id", userController.find);
router.post("/", userController.create);
export default router;
