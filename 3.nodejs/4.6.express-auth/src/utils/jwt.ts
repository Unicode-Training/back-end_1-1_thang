import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
import { User } from "../prisma/generated/prisma/client";
export class Jwt {
    private static SECRET: string = process.env.JWT_SECRET!;
    private static EXPIRED: number = process.env.JWT_EXPIRED as unknown as number;
    static generateToken(payload: JwtPayload) {
        const accessToken = jsonwebtoken.sign(payload, this.SECRET, {
            expiresIn: this.EXPIRED
        });
        return { accessToken }
    }

    static verifyToken(token: string) {
        try {
            const decoded = jsonwebtoken.verify(token, this.SECRET);
            return decoded;
        } catch {
            return false;
        }
    }
}

//sign jwt
// - secret key
// - expire
// - data