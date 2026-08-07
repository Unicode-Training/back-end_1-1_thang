import { Request, Response } from "express";
import { productService } from "../services/product.service";
import { StatusCodes } from "http-status-codes";

export const productController = {
    async create(req: Request, res: Response) {
        const data = await productService.create(req.body);
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Create product success",
            data
        })
    },
    async find(req: Request, res: Response) {
        const { id } = req.params;
        const data = await productService.find(+id!);
        return res.json({
            success: true,
            message: "Get product success",
            data
        })
    }
}