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
    }
}