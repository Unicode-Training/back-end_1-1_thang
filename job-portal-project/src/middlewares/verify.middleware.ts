import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/http.exception";
export const verifyMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user?.status === "INACTIVE") {
        throw new HttpException("User not verify", 401);
    }
    next();
}   