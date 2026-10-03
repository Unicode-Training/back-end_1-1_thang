import { Request, Response } from "express";
import { videoService } from "../services/video.service";

export const videoController = {
    async findAll(req: Request, res: Response) {
        const data = await videoService.findAll();
        return res.json({ data })
    },
    async create(req: Request, res: Response) {
        const data = await videoService.create(req.body);
        return res.json({
            data
        });
    }
}