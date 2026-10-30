import { Request, Response } from "express";
import { jobService } from "../../services/employer/job.service";

export const jobController = {
    async findAll(req: Request, res: Response) {
        const data = await jobService.findAll();
        return res.json({
            data,
            success: true,
            message: 'Get jobs success'
        })
    },

    async find(req: Request, res: Response) {
        const { id } = req.params;
        const data = await jobService.find(+id!);
        return res.json({
            data,
            success: true,
            message: "Get job success"
        })
    },

    async create(req: Request, res: Response) {
        const companyId = req.companyId;
        const data = await jobService.create(req.body, companyId!);
        return res.status(201).json({
            data,
            success: true,
            message: "Create job success"
        })
    }
}