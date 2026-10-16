import { NextFunction, Request, Response } from "express";
import { Jwt } from "../utils/jwt";
import HttpException from "../exceptions/http.exception";
import { userService } from "../services/user.service";
import { JwtPayload } from "jsonwebtoken";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ').at(-1);
    const decoded = Jwt.verifyToken(token!) as JwtPayload;
    if (!decoded) {
        throw new HttpException("Token invalid", 401);
    }
    const user = await userService.find(decoded.id);
    req.user = user;
    next();
}