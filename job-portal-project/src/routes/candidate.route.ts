import express from "express";
import { candidateController } from "../controllers/candidate/candidate.controller";
import { verifyMiddleware } from "../middlewares/verify.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { updateProfileSchema } from "../validators/candidate/updateProfile.validator";
import { createExpSchema } from "../validators/candidate/createExp.validator";
import { createEducationSchema } from "../validators/candidate/createEducation.validator";
import { createSkillSchema } from "../validators/candidate/createSkill.validator";
import { jobApplyController } from "../controllers/candidate/job-apply.controller";
import { applyJobSchema } from "../validators/candidate/apployJob.validator";
import { jobSavedController } from "../controllers/candidate/job-saved.controller";
const router = express.Router();
router.use(authMiddleware);
router.use(verifyMiddleware);

//PROFILE
router.get('/profile', candidateController.profile);
router.patch('/profile', validate(updateProfileSchema), candidateController.updateProfile);
router.get('/profile/exps', candidateController.findExps);
router.post('/profile/exps', validate(createExpSchema), candidateController.createExp);
router.get('/profile/educations', candidateController.findEducations);
router.post('/profile/educations', validate(createEducationSchema), candidateController.createEducation);
router.get('/profile/skills', candidateController.findSkill);
router.post('/profile/skills', validate(createSkillSchema), candidateController.createSkill);

//APPLY
router.get('/apply', jobApplyController.findAllApply);
router.get('/apply/:id', jobApplyController.findApply);
router.post('/apply/:jobId', validate(applyJobSchema), jobApplyController.apply);
router.delete('/apply/:id', jobApplyController.cancel);

//JOB SAVED
router.get('/jobs/saved', jobSavedController.findAllSaved);
router.post('/jobs/:jobId/saved', jobSavedController.saved);
router.delete('/jobs/:jobId/saved', jobSavedController.unsaved);

export default router;