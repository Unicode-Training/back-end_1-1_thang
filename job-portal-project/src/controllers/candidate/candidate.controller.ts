import { Request, Response } from "express";
import { candidateService } from "../../services/candidate/candidate.service";

export const candidateController = {
    async profile(req: Request, res: Response) {
        const userId = req.user?.id;
        const data = await candidateService.find(userId!);
        return res.json({
            data,
            success: true,
            message: "Get candidate profile success"
        });
    },

    async updateProfile(req: Request, res: Response) {
        const userId = req.user?.id;
        const data = await candidateService.updateProfile(req.body, +userId!);
        return res.json({
            data,
            success: true,
            message: "Update candidate profile success"
        })
    },

    async findExps(req: Request, res: Response) {
        const userId = req.user?.id;
        const data = await candidateService.findExps(userId!);

        return res.json({
            data,
            success: true,
            message: "Get exp list candidate"
        });
    },

    async createExp(req: Request, res: Response) {
        const userId = req.user?.id;
        const data = await candidateService.createExp(req.body, userId!);
        return res.status(201).json({
            data,
            success: true,
            message: "Create exp candidate"
        });
    },

    async findEducations(req: Request, res: Response) {
        const userId = req.user?.id;
        const data = await candidateService.findEducations(userId!);
        return res.json({
            data,
            success: true,
            message: "Get education list candidate"
        });
    },

    async createEducation(req: Request, res: Response) {
        const userId = req.user?.id;
        const data = await candidateService.createEducation(req.body, userId!);
        return res.status(201).json({
            data,
            success: true,
            message: "Create education candidate"
        });
    },

    async findSkill(req: Request, res: Response) {
        const userId = req.user?.id;
        const data = await candidateService.findSkill(userId!);
        return res.json({
            data,
            success: true,
            message: "Get skill list candidate"
        });
    },

    async createSkill(req: Request, res: Response) {
        const userId = req.user?.id;
        const data = await candidateService.createSkill(req.body, userId!);
        return res.status(201).json({
            data,
            success: true,
            message: "Create skill candidate"
        });
    },
}