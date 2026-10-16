import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/http.exception";

export const errorMiddleware = (err: HttpException, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const isProduction = process.env.NODE_ENV === "production";
    const message = isProduction ? "Internal Server Error" : err.message
    return res.status(status).json({
        success: false,
        error: message
    })
}

export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
    return res.status(404).json({
        success: false,
        message: `Not found path: ${req.path}`
    })
}