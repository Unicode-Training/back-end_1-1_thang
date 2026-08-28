import HttpException from "../exceptions/http.exception";
import { prisma } from "../libs/prisma";
import { LoginData, RegisterData } from "../types/auth.type";
import { Hash } from "../utils/hashing";
import { redis } from "../utils/io-redis";
import { Jwt } from "../utils/jwt";

export const authService = {
    async login(loginData: LoginData) {
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

        return Jwt.generateToken({ id: user.id, jti: crypto.randomUUID() });
    },
    register(registerData: RegisterData) {
        return prisma.user.create({
            omit: {
                password: true
            },
            data: {
                ...registerData,
                password: Hash.make(registerData.password)
            }
        })
    },
    logout(jti: string, expired: number) {
        //Lưu jti -> blacklist
        //key: blacklist:{jti}: true
        const ttl = Math.ceil(expired - Date.now() / 1000);
        redis.setex(`blacklist:${jti}`, ttl, 'true');
    }

}

//Chức năng blacklist
// - Không lưu cả token vào blacklist: Tốn dung lượng, nếu redis bị hack -> lộ token
// - Nên lưu jti (jsonwebtoken ID)