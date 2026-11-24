import express from "express";
import { jobController } from "../../controllers/employer/job.controller";
import { validate } from "../../middlewares/validate.middleware";
import { createJobSchema } from "../../validators/employer/job.validator";
import { jobApplyController } from "../../controllers/employer/job-apply.controller";
import { updateApplyJobStatusSchema } from "../../validators/employer/apply-job.validator";

const router = express.Router();

//JOB
router.get('/jobs', jobController.findAll);
router.get('/jobs/:id', jobController.find);
router.post('/jobs', validate(createJobSchema), jobController.create);
router.patch('/jobs/:id', jobController.update);
router.delete('/jobs/:id', jobController.delete);

//APPLY
router.get('/apply', jobApplyController.findAll);
router.get('/apply/:id', jobApplyController.find);
router.patch('/apply/:id/status', validate(updateApplyJobStatusSchema), jobApplyController.updateApplyStatus);

export default router;