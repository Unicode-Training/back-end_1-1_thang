import express from "express";
import { jobController } from "../../controllers/employer/job.controller";
import { validate } from "../../middlewares/validate.middleware";
import { createJobSchema } from "../../validators/employer/job.validator";

const router = express.Router();

router.get('/jobs', jobController.findAll);
router.get('/jobs/:id', jobController.find);
router.post('/jobs', validate(createJobSchema), jobController.create);


export default router;