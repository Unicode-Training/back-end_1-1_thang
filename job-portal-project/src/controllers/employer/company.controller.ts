import { Request, Response } from "express";
import { companyService } from "../../services/employer/company.service";

export const companyController = {
    async create(req: Request, res: Response) {
        const user = req.user;
        const data = await companyService.create(req.body, user!.id);
        return res.status(201).json({
            data,
            success: true,
            message: "Create company success"
        })
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const user = req.user;
        const data = await companyService.delete(+id!, user!.id);
        return res.json({
            data,
            success: true,
            message: "Delete company success"
        })
    }
}