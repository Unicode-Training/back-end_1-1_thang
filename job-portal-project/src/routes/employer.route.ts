import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { verifyMiddleware } from "../middlewares/verify.middleware";
import { companyController } from "../controllers/employer/company.controller";
import { roleMiddleware } from "../middlewares/role.middleware";
import { validate } from "../middlewares/validate.middleware";
import { createCompanySchema, updateCompanySchema } from "../validators/employer/company.validator";
import { companyDocumentController } from "../controllers/employer/company-document.controller";
import { createCompanyDocumentSchema, updateCompanyDocumentSchema } from "../validators/employer/company-document.validator";
import { employerProfileController } from "../controllers/employer/employer-profile.controller";
import { createEmployerProfileSchema } from "../validators/employer/employer-profile.validator";
import { employerMiddleware } from "../middlewares/employer.middleware";
import { companyAddressController } from "../controllers/employer/company-address.controller";
const router = express.Router();
router.use(authMiddleware);
router.use(verifyMiddleware);
router.use(roleMiddleware('EMPLOYER'));

router.use(employerMiddleware(true));

//DOCUMENT
router.get('/company/documents', companyDocumentController.findAll);
router.post('/company/documents', validate(createCompanyDocumentSchema), companyDocumentController.create);
router.patch('/company/documents/:id', validate(updateCompanyDocumentSchema), companyDocumentController.update);
router.delete('/company/documents/:id', companyDocumentController.delete);

//PROFILES
router.get('/company/profiles', employerProfileController.findAll);
router.post('/company/profiles', validate(createEmployerProfileSchema), employerProfileController.create);
router.delete('/company/profiles/:id', employerProfileController.delete);

//ADDRESS
router.get('/company/address', companyAddressController.findAll);

//COMPANY
router.post('/company', validate(createCompanySchema), companyController.create);
router.patch('/company/:id', validate(updateCompanySchema), companyController.update);
router.delete('/company/:id', companyController.delete);
export default router;