import { Request, Response } from "express";
import { productService } from "../services/product.service";
import { StatusCodes } from "http-status-codes";
import { ProductQuery } from "../types/product.type";

export const productController = {
    async findAll(req: Request, res: Response) {
        const { data: products, count } = await productService.findAll(req.query as unknown as ProductQuery);
        const page = req.query.page || 1;
        return res.json({
            data: products,
            message: "Get product list success",
            success: true,
            meta: {
                total: count,
                currentPage: +page
            }
        });
    },
    async find(req: Request, res: Response) {
        const { id } = req.params;
        const data = await productService.find(+id!);
        return res.json({
            success: true,
            message: "Get product success",
            data
        })
    },
    async create(req: Request, res: Response) {
        const data = await productService.create(req.body);
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Create product success",
            data
        })
    },

}