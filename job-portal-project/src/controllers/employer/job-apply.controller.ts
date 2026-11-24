import { Request, Response } from "express";
import { jobApplyService } from "../../services/employer/job-apply.service";

export const jobApplyController = {
    async findAll(req: Request, res: Response) {
        const data = await jobApplyService.findAll();
        return res.json({
            success: true,
            data,
            message: "Get apply list success"
        })
    },

    async find(req: Request, res: Response) {
        const { id } = req.params;
        const data = await jobApplyService.find(+id!);
        return res.json({
            data,
            success: true,
            message: "Get detail apply success"
        })
    },

    async updateApplyStatus(req: Request, res: Response) {

        const { id } = req.params;

        const data = await jobApplyService.updateApplyStatus(+id!, req.body);

        return res.json({
            data,
            success: true,
            message: 'Update status apply job success'
        });
    }
}