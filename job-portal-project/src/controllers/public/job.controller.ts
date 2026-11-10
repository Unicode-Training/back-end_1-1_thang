import { Request, Response } from "express";
import { jobService } from "../../services/public/job.service";
import { JobPublicQuery } from "../../types/job.type";

export const jobController = {
    async findAll(req: Request, res: Response) {
        const [data, count] = await jobService.findAll(req.query as unknown as JobPublicQuery);
        return res.json({
            data,
            success: true,
            message: "Get job list success",
            meta: {
                total: count,
                currentPage: req.query.page ? +req.query.page : 1
            }
        })
    },

    async find(req: Request, res: Response) {
        const { id } = req.params;
        const data = await jobService.find(+id!);
        return res.json({
            data,
            success: true,
            message: "Get job success"
        });
    },

    async related(req: Request, res: Response) {
        const { id } = req.params;
        const limit = req.query.limit ? +req.query.limit : 3;
        const data = await jobService.related(+id!, limit);
        return res.json({
            success: true,
            message: "Get job related success",
            data
        })
    }
}