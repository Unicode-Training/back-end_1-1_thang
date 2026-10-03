import { NextFunction, Request, Response } from "express";
import { User } from "../prisma/generated/prisma/client";
import HttpException from "../exceptions/http.exception";

export const roleMiddleware = (permission: string) => (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as User & { permissions: string[] };

    if (user.type === "ADMIN") {
        return next();
    }

    const permissions = user.permissions;

    if (!permissions.includes(permission)) {
        throw new HttpException("Fobidden", 403);
    }
    return next();
}