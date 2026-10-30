import { Request, Response } from "express";
import { companyAddressService } from "../../services/employer/company-address.service";

export const companyAddressController = {
    async findAll(req: Request, res: Response) {
        const companyId = req.companyId;
        const data = await companyAddressService.findAll(companyId!);
        return res.json({
            data,
            success: true,
            message: "Get address success"
        })
    },

    async create(req: Request, res: Response) {
        const companyId = req.companyId;
        const data = await companyAddressService.create(companyId!, req.body);
        return res.status(201).json({
            data,
            success: true,
            message: "Create address success"
        });
    },

    async updateHeadquarter(req: Request, res: Response) {
        const { id } = req.params;
        const data = await companyAddressService.updateHeadquarter(+id!);
        return res.json({
            success: true,
            data,
            message: "Update headquarter success"
        });
    },

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const data = await companyAddressService.update(+id!, req.body);
        return res.json({
            success: true,
            data,
            message: "Update company address success"
        });

    },

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const data = await companyAddressService.delete(+id!);
        return res.json({
            success: true,
            data,
            message: "Delete company address success"
        });
    }
}