import { Request, Response } from "express";
import { messageService } from "../services/message.service";

export const messageController = {
    async findAll(req: Request, res: Response) {
        const data = await messageService.findAll();
        return res.json({ data })
    },
    async create(req: Request, res: Response) {
        const data = await messageService.create(req.body);
        return res.json({ data })
    }
}