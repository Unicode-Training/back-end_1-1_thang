import { Request, Response } from "express";
import { employerProfileService } from "../../services/employer/employer-profile.service";

export const employerProfileController = {
    async findAll(req: Request, res: Response) {
        const userId = req.user?.id;
        const data = await employerProfileService.findAll(userId!);
        return res.json({
            data,
            message: "Get list user success",
            success: true
        });
    },

    async create(req: Request, res: Response) {
        const companyId = req.companyId;
        const data = await employerProfileService.create(req.body, companyId!);
        return res.status(201).json({
            data,
            message: "Create profile success",
            success: true
        })
    },

    async assignProfile(req: Request, res: Response) {
        const companyId = req.companyId;
        const data = await employerProfileService.assignProfile(req.body, companyId!);
        return res.json({
            data,
            success: true,
            message: "Assign profile success"
        });
    },

    async delete(req: Request, res: Response) {
        const companyId = req.companyId;
        const { id } = req.params;
        const data = await employerProfileService.delete(+id!, companyId!);
        return res.json({
            data,
            message: "Delete profile success",
            success: true
        })
    }
}