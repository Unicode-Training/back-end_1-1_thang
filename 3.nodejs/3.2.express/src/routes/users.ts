import express from "express";
import { userController } from "../controllers/user.controller";
import { validate } from "../middlewares/validate.middleware";
import { createUserSchema } from "../validators/user.validator";
const router = express.Router();
router.get("/", userController.index);
router.get("/:id", userController.find);
router.post("/", validate(createUserSchema), userController.create);
export default router;
