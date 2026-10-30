import express from "express";
import { companyController } from "../../controllers/employer/company.controller";
import { validate } from "../../middlewares/validate.middleware";
import { createCompanySchema, updateCompanySchema } from "../../validators/employer/company.validator";
import { companyDocumentController } from "../../controllers/employer/company-document.controller";
import { createCompanyDocumentSchema, updateCompanyDocumentSchema } from "../../validators/employer/company-document.validator";
import { employerProfileController } from "../../controllers/employer/employer-profile.controller";
import { assignEmployerProfileSchema, createEmployerProfileSchema } from "../../validators/employer/employer-profile.validator";
import { companyAddressController } from "../../controllers/employer/company-address.controller";
import { createCompanyAddressSchema, updateCompanyAddressSchema } from "../../validators/employer/company-address.validator";
const router = express.Router();

//DOCUMENT
router.get('/company/documents', companyDocumentController.findAll);
router.post('/company/documents', validate(createCompanyDocumentSchema), companyDocumentController.create);
router.patch('/company/documents/:id', validate(updateCompanyDocumentSchema), companyDocumentController.update);
router.delete('/company/documents/:id', companyDocumentController.delete);

//PROFILES
router.get('/company/profiles', employerProfileController.findAll);
router.post('/company/profiles', validate(createEmployerProfileSchema), employerProfileController.create);
router.patch('/company/profiles', validate(assignEmployerProfileSchema), employerProfileController.assignProfile);
router.delete('/company/profiles/:id', employerProfileController.delete);

//ADDRESS
router.get('/company/address', companyAddressController.findAll);
router.post('/company/address', validate(createCompanyAddressSchema), companyAddressController.create);
router.patch('/company/address/:id/headquarter', companyAddressController.updateHeadquarter);
router.patch('/company/address/:id', validate(updateCompanyAddressSchema), companyAddressController.update);
router.delete('/company/address/:id', companyAddressController.delete);

//COMPANY
router.post('/company', validate(createCompanySchema), companyController.create);
router.patch('/company/:id', validate(updateCompanySchema), companyController.update);
router.delete('/company/:id', companyController.delete);
export default router;