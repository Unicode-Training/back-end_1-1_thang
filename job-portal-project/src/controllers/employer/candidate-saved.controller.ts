import { Request, Response } from "express";
import { candidateSavedService } from "../../services/employer/candidate-saved.service";

export const candidateSavedController = {

    async findAllSaved(req: Request, res: Response) {
        const userId = req.user?.id;
        const data = await candidateSavedService.findAllSaved(userId!);
        return res.json({
            success: true,
            data,
            message: 'Get list candidate success'
        })
    },

    async saved(req: Request, res: Response) {
        const { candidateId } = req.params;
        const userId = req.user?.id;
        const data = await candidateSavedService.save(+candidateId!, userId!);
        return res.json({
            success: true,
            data,
            message: 'Save candidate success'
        })
    },

    async unsaved(req: Request, res: Response) {
        const { candidateId } = req.params;
        const userId = req.user?.id;
        const data = await candidateSavedService.unsaved(+candidateId!, userId!);
        return res.json({
            success: true,
            data,
            message: 'Unsaved candidate success'
        })
    }
}