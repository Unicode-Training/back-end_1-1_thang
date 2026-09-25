import axios from "axios";
import { Jwt } from "../utils/jwt";
import { prisma } from "../libs/prisma";
import { JwtPayload } from "jsonwebtoken";
import { redis } from "../utils/io-redis";

export const socialAuthService = {
    async google() {
        const url = `https://accounts.google.com/o/oauth2/v2/auth`;
        const client_id = process.env.GOOGLE_CLIENT_ID;
        const redirect_uri = process.env.GOOGLE_CALLBACK_URL;
        const response_type = 'code';
        const scope = "email profile";
        const access_type = "offline";

        const googleRedirect = url + '?' + new URLSearchParams({
            client_id,
            redirect_uri,
            response_type,
            scope,
            access_type
        } as Record<string, string>).toString();

        return googleRedirect;
    },


    async googleLogin(code: string) {
        const googleToken = await this.getGoogleAccessToken(code);
        if (!googleToken) {
            return false;
        }
        const { id_token } = googleToken;
        const googleUser = Jwt.decodeToken(id_token) as JwtPayload;

        //Xử lý insert hoặc lấy từ database (Table users)
        let user = await prisma.user.findUnique({
            where: {
                email: googleUser?.email
            }
        });
        if (!user) {
            user = await prisma.user.create({
                data: {
                    name: googleUser.name,
                    email: googleUser.email,
                    status: true
                }
            })
        }

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

        return token;
    },

    async getGoogleAccessToken(code: string) {
        try {
            const response = await axios.post(`https://oauth2.googleapis.com/token`, {
                code,
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                redirect_uri: process.env.GOOGLE_CALLBACK_URL,
                grant_type: 'authorization_code'
            });
            return response.data;
        } catch {
            return false;
        }
    }
}