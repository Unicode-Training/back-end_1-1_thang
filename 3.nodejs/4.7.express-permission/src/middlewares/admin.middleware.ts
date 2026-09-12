import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/http.exception";

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user?.type === "CLIENT") {
        throw new HttpException("Fobidden", 403);
    }
    return next();
}