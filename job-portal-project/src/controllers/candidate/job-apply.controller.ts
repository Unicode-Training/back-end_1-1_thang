import { Request, Response } from "express";
import { jobApplyService } from "../../services/candidate/job-apply.service";

export const jobApplyController = {
    async findAllApply(req: Request, res: Response) {
        const userId = req.user?.id;
        const data = await jobApplyService.findAllApply(userId!);
        return res.json({
            data,
            success: true,
            message: 'Get list apply job success'
        });
    },
    async findApply(req: Request, res: Response) {
        const userId = req.user?.id;
        const { id } = req.params;
        const data = await jobApplyService.findApply(+id!, userId!);
        return res.json({
            data,
            success: true,
            message: "Get apply job success"
        })
    },
    async apply(req: Request, res: Response) {
        const userId = req.user?.id;
        const { jobId } = req.params;
        const data = await jobApplyService.apply(+jobId!, userId!);
        return res.status(201).json({
            data,
            success: true,
            message: 'Apply job success'
        });
    },
    async updateApplyStatus(req: Request, res: Response) {
        const userId = req.user?.id;
        const { id } = req.params;

        const data = await jobApplyService.updateApplyStatus(+id!, userId!, req.body);

        return res.json({
            data,
            success: true,
            message: 'Update status apply job success'
        });
    }
}