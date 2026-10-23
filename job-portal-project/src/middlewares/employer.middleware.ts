import { NextFunction, Request, Response } from "express";
import { prisma } from "../libs/prisma";
import HttpException from "../exceptions/http.exception";

export const employerMiddleware = (requiredOwner: boolean = false) => async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;
    const profile = await prisma.employerProfile.findUnique({
        where: {
            userId: user?.id!
        }
    });
    if (!profile) {
        return next();
    }
    if (profile?.verificationStatus === "PENDING") {
        throw new HttpException("Account not yet approved");
    }
    if (requiredOwner && !profile?.isOwner) {
        throw new HttpException("Forbidden", 403);
    }
    req.companyId = profile?.companyId!
    next();
}