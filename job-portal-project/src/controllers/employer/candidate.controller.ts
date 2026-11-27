import { Request, Response } from "express";
import { candidateService } from "../../services/employer/candidate.service";
import { CandidateQuery } from "../../types/candidate.type";

export const candidateController = {
    async findAll(req: Request, res: Response) {
        const [data, count] = await candidateService.findAll(req.query as unknown as CandidateQuery);
        return res.json({
            data,
            meta: {
                total: count,
                currentPage: req.query.page ? +req.query.page : 1
            },
            success: true,
            message: "Get candidate success"
        })
    },
    async find(req: Request, res: Response) {
        const { id } = req.params;
        const data = await candidateService.find(+id!);
        return res.json({
            success: true,
            data,
            message: "Get candidate success"
        });
    }
}