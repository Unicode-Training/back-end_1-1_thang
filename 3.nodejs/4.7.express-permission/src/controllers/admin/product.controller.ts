import { Request, Response } from "express";

export const productController = {
    index(req: Request, res: Response) {
        return res.json({
            message: "Find all products"
        });
    },
    create(req: Request, res: Response) {
        return res.json({
            message: "create products"
        });
    },
    update(req: Request, res: Response) {
        return res.json({
            message: "Update products"
        });
    },
    delete(req: Request, res: Response) {
        return res.json({
            message: "delete products"
        });
    }
}