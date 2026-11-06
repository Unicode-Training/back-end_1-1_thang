import { Request, Response } from "express";
import { industryService } from "../../services/public/industry.service";
import { IndustryQuery } from "../../types/industry.type";

export const industryController = {
    async findAll(req: Request, res: Response) {
        const [data, count] = await industryService.findAll(req.query as unknown as IndustryQuery);
        return res.json({
            data,
            meta: {
                total: count,
                currentPage: req.query.page ? +req.query.page : 1
            },
            success: true,
            message: "Get industry list success"
        });
    }
}