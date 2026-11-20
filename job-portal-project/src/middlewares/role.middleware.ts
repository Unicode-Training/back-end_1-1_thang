import { NextFunction, Request, Response } from "express"
import HttpException from "../exceptions/http.exception";

export const roleMiddleware = (role: string | string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;
        let allowed = true;
        if (typeof role === 'string' && user?.role !== role) {
            allowed = false;
        }
        if (Array.isArray(role) && !role.includes(user!.role)) {
            allowed = false;
        }
        if (!allowed) {
            throw new HttpException("Fobidden", 403);
        }
        next();
    }
}