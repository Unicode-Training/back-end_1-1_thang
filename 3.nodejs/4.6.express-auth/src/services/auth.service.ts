import { JwtPayload } from "jsonwebtoken";
import HttpException from "../exceptions/http.exception";
import { prisma } from "../libs/prisma";
import { LoginData, RegisterData } from "../types/auth.type";
import { Hash } from "../utils/hashing";
import { redis } from "../utils/io-redis";
import { Jwt } from "../utils/jwt";
import { deviceService } from "./device.service";
import { Request } from "express";
import { sendMail, sendMailWithTemplate } from "../utils/mailer";
import { generateOtp, md5 } from "../utils/auth";

export const authService = {
    async login(loginData: LoginData, req: Request) {
        //1. Kiểm tra email tồn tại trong Database
        const user = await prisma.user.findUnique({
            where: {
                email: loginData.email
            }
        });
        if (!user) {
            throw new HttpException("Email or password invalid", 401);
        }
        //2. Verify Password
        if (!Hash.verify(user.password as string, loginData.password)) {
            throw new HttpException("Email or password invalid", 401);
        }
        //3. Tạo token
        const jti = crypto.randomUUID();
        const token = Jwt.generateToken({ id: user.id, jti });

        //Lưu refresh vào redis
        //key: refreshToken:{userId}:{jti}
        //value: true
        const payloadRefreshToken = Jwt.decodeToken(token.refreshToken) as JwtPayload;
        const payloadAccessToken = Jwt.decodeToken(token.accessToken) as JwtPayload;
        const expRefreshToken = payloadRefreshToken?.exp as number;
        const expAccessToken = payloadAccessToken?.exp as number;
        const ttlRefreshToken = Math.ceil(expRefreshToken - Date.now() / 1000);
        await redis.setex(`refreshToken:${user.id}:${jti}`, ttlRefreshToken, JSON.stringify({
            expAccessToken
        }));

        //Lưu Device
        await deviceService.create({
            userId: user.id,
            ipAddress: req.ip || "Unknown",
            userAgent: req.headers["user-agent"] || "Unknown",
            jti,
            activedAt: new Date(),
        });

        //Gửi email cảnh báo
        const subject = `[Cảnh báo đăng nhập]: Bạn vừa đăng nhập`;

        // sendMail(user.email, subject, html);
        sendMailWithTemplate(user.email, subject, 'login-notice', {
            name: user.name,
            ip: req.ip,
            userAgent: req.headers["user-agent"],
            now: new Date().toLocaleDateString()
        });

        return token;
    },
    async register(registerData: RegisterData) {
        const user = await prisma.user.create({
            omit: {
                password: true
            },
            data: {
                ...registerData,
                password: Hash.make(registerData.password)
            }
        });

        //Tạo OTP
        const otp = generateOtp();
        //Lưu OTP vào redis
        const ttl = 300;
        await redis.setex(`user_active_otp:${md5(otp)}`, ttl, JSON.stringify({
            userId: user.id
        }));

        //Gửi email
        const subject = 'Mã kích hoạt tài khoản của bạn';
        sendMailWithTemplate(user.email, subject, 'user-active-otp', {
            name: user.name,
            email: user.email,
            otp
        });

        return user;
    },
    logout(jti: string, expired: number) {
        //Lưu jti -> blacklist
        //key: blacklist:{jti}: true
        const ttl = Math.ceil(expired - Date.now() / 1000);
        redis.setex(`blacklist:${jti}`, ttl, 'true');
    },

    async refreshToken(token: string) {
        //Check token
        const decoded = Jwt.verifyRefreshToken(token) as JwtPayload;
        if (!decoded) {
            throw new HttpException("Refresh token invalid", 401);
        }
        //Token hợp lệ, Không tồn tại redis
        const { jti, id: userId } = decoded;

        const tokenOnRedis = await redis.get(`refreshToken:${userId}:${jti}`);

        if (!tokenOnRedis) {
            throw new HttpException("Refresh token invalid", 401);
        }

        //Tạo token mới
        // - userId -> Đã có
        // - jti mới
        // - Có 2 chiến lược
        // + Chỉ tạo accessToken mới, giữ nguyên Refresh token cũ
        // + Tạo accessToken mới, tạo refreshToken mới, thu hồi refreshToken cũ => Refresh Token Rotation
        const newJti = crypto.randomUUID();
        const newToken = Jwt.generateToken({ id: userId, jti: newJti });

        //Lưu thông tin jti của refresh mới vào redis
        const payloadRefreshToken = Jwt.decodeToken(newToken.refreshToken) as JwtPayload;
        const payloadAccessToken = Jwt.decodeToken(newToken.accessToken) as JwtPayload;
        const expRefreshToken = payloadRefreshToken?.exp as number;
        const ttlRefreshToken = Math.ceil(expRefreshToken - Date.now() / 1000);
        const expAccessToken = payloadAccessToken?.exp as number;

        await redis.setex(`refreshToken:${userId}:${newJti}`, ttlRefreshToken, JSON.stringify({
            expAccessToken
        }));

        //Thêm jti cũ vào blacklist để vô hiệu hóa ngay lập tức
        const refreshTokenOnRedis = await redis.get(`refreshToken:${userId}:${jti}`);
        if (refreshTokenOnRedis) {
            const refreshTokenOnRedisParse = JSON.parse(refreshTokenOnRedis);
            const oldExpRefreshToken = refreshTokenOnRedisParse.expAccessToken;
            const ttlAccessToken = Math.ceil(oldExpRefreshToken - Date.now() / 1000);
            redis.setex(`blacklist:${jti}`, ttlAccessToken, 'true');
        }

        //Thu hổi jti của refresh token cũ
        await redis.del(`refreshToken:${userId}:${jti}`);

        return newToken;
    },

    //Thu hồi phiên đăng nhập của user theo jti
    async revokeByJti(userId: number, jti: string) {
        const refreshTokenOnRedis = await redis.get(`refreshToken:${userId}:${jti}`);
        if (refreshTokenOnRedis) {
            const refreshTokenOnRedisParse = JSON.parse(refreshTokenOnRedis);
            const oldExpRefreshToken = refreshTokenOnRedisParse.expAccessToken;
            const ttlAccessToken = Math.ceil(oldExpRefreshToken - Date.now() / 1000);
            redis.setex(`blacklist:${jti}`, ttlAccessToken, 'true');
        }

        await redis.del(`refreshToken:${userId}:${jti}`);

        return true;
    },

    //Thu hồi tất cả phiên đăng nhập của user
    async revokeByUser(userId: number, jti?: string) {
        //Quét tất cả key refreshToken theo user trên redis
        const keys = await redis.keys(`refreshToken:${userId}:*`);
        for (const key of keys) {
            const jtiOnRedis = key.split(':').slice(-1).join();
            if (jti && jti === jtiOnRedis) {
                continue;
            }
            this.revokeByJti(userId, jtiOnRedis);
        }

    },

    //Kích hoạt tài khoản
    async activeUser(otp: string, loginUrl: string) {
        const hashMd5 = md5(otp);
        const otpOnRedis = await redis.get(`user_active_otp:${hashMd5}`);
        if (!otpOnRedis) {
            throw new HttpException("Đã có lỗi xảy ra, vui lòng thử lại sau");
        }
        const { userId } = JSON.parse(otpOnRedis);
        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                status: true
            }
        });
        await redis.del(`user_active_otp:${hashMd5}`);
        const subject = 'Tài khoản đã sẵn sàng';
        sendMailWithTemplate(user.email, subject, 'user-active', {
            name: user.name,
            email: user.email,
            link: loginUrl
        })
        return true;
    }

}

//Chức năng blacklist
// - Không lưu cả token vào blacklist: Tốn dung lượng, nếu redis bị hack -> lộ token
// - Nên lưu jti (jsonwebtoken ID)