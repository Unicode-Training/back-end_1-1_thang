import { NextFunction, Request, Response } from "express"
import HttpException from "../exceptions/http.exception";

export const roleMiddleware = (role: string) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;
        if (user?.role !== role) {
            throw new HttpException("Fobidden", 403);
        }
        next();
    }
}