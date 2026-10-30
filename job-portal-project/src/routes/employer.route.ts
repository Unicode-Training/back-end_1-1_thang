import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { verifyMiddleware } from "../middlewares/verify.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import onlyOwnerRoute from "./employer/only-owner.route";
import allEmployerRoute from "./employer/all-employer.route";
import { employerMiddleware } from "../middlewares/employer.middleware";

const router = express.Router();

router.use(authMiddleware);
router.use(verifyMiddleware);
router.use(roleMiddleware('EMPLOYER'));

router.use(employerMiddleware(false), allEmployerRoute)

router.use(employerMiddleware(true), onlyOwnerRoute);


export default router;