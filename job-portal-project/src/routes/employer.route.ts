import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { verifyMiddleware } from "../middlewares/verify.middleware";
import { companyController } from "../controllers/employer/company.controller";
import { roleMiddleware } from "../middlewares/role.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createCompanySchema } from "../validators/employer/company.validator";
const router = express.Router();
router.use(authMiddleware);
router.use(verifyMiddleware);
router.use(roleMiddleware('EMPLOYER'))
router.post('/company', validate(createCompanySchema), companyController.create);
router.delete('/company/:id', companyController.delete);
export default router;