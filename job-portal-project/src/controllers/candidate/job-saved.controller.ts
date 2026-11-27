import { Request, Response } from "express";
import { jobSavedService } from "../../services/candidate/job-saved.service";

export const jobSavedController = {
    async findAllSaved(req: Request, res: Response) {
        const userId = req.user?.id;
        const data = await jobSavedService.findAllSaved(userId!);
        return res.json({
            success: true,
            data,
            message: "Get saved job success"
        })

    },
    async saved(req: Request, res: Response) {
        const { jobId } = req.params;
        const userId = req.user?.id;
        const data = await jobSavedService.saved(+jobId!, userId!);
        return res.json({
            success: true,
            data,
            message: "Saved job success"
        });
    },

    async unsaved(req: Request, res: Response) {
        const { jobId } = req.params;
        const userId = req.user?.id;

        const data = await jobSavedService.unsaved(+jobId!, userId!);
        return res.json({
            success: true,
            data,
            message: "Unsaved job success"
        });
    }
}