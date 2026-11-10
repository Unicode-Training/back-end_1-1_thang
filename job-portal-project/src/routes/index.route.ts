import express, { Request, Response } from "express";
import { industryController } from "../controllers/public/industry.controller";
import { jobController } from "../controllers/public/job.controller";
const router = express.Router();
router.get('/', (req: Request, res: Response) => {
    res.json({
        message: 'welcome'
    })
});

router.get('/industry', industryController.findAll);
router.get('/jobs', jobController.findAll);
router.get('/jobs/:id/related', jobController.related);
router.get('/jobs/:id', jobController.find);


export default router;