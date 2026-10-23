import { Request, Response } from "express";
import { companyDocumentService } from "../../services/employer/company-document.service";

export const companyDocumentController = {
    async findAll(req: Request, res: Response) {
        const { id } = req.params;
        const userId = req.user?.id;
        const data = await companyDocumentService.findAll(+id!, userId!);
        return res.json({
            data,
            success: true,
            message: "Get company documents success"
        })
    },

    async create(req: Request, res: Response) {
        const userId = req.user?.id;
        const data = await companyDocumentService.create(req.body, userId!);
        return res.status(201).json({
            data,
            success: true,
            message: "Create document success"
        });
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const userId = req.user?.id;
        const data = await companyDocumentService.update(req.body, +id!, userId!);
        return res.json({
            data,
            success: true,
            message: "Update document success"
        });
    },

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const userId = req.user?.id;
        const data = await companyDocumentService.delete(+id!, userId!);
        return res.json({
            data,
            success: true,
            message: "Delete document success"
        })
    }
}