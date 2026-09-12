import express from "express";
import { userController } from "../controllers/user.controller";
const router = express.Router();
router.get("/users", userController.index);
router.get("/users/:id", userController.find);
router.post("/users", userController.create);
router.patch("/users/:id", userController.update);
export default router;
