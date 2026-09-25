import { NextFunction, Request, Response } from "express";
import HttpException from "../exceptions/http.exception";
import { Jwt } from "../utils/jwt";
import { userService } from "../services/user.service";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../prisma/generated/prisma/client";
import { redis } from "../utils/io-redis";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ').slice(-1).join();

    const decoded = Jwt.verifyToken(token as string) as JwtPayload & { id: number };

    // - User đã bị xóa
    // - User đã bị khóa
    // - User chưa kích hoạt tài khoản

    if (!decoded) {
        throw new HttpException("Unauthorize", 401);
    }

    const { id, jti, exp } = decoded;

    //Check blacklist -> Kiểm tra token này đã được sử và đăng xuất rồi
    //Lưu blacklist vào database 
    // - Blacklist là dữ liệu tạm -> Không phù hợp
    // - Tốc truy vấn chậm
    // - Không có cơ chế dọn dẹp
    const blacklist = await redis.get(`blacklist:${jti}`);
    if (blacklist) {
        throw new HttpException("Unauthorize", 401);
    }

    const user = await userService.find(+id);

    if (!user) {
        throw new HttpException("User not found", 404);
    }

    if (!user.status) {
        throw new HttpException("User unverify", 403);
    }
    req.user = user;
    req.jti = jti!;
    req.expired = exp!;

    next();
}

//Header
//Authorization: <type> <value>