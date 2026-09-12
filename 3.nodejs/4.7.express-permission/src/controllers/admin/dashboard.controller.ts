import { Request, Response } from "express";

export const dashboardController = {
    index(req: Request, res: Response) {
        return res.json({
            message: "Get dashboard success"
        })
    }
}