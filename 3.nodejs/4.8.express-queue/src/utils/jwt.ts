import jsonwebtoken, { JwtPayload } from "jsonwebtoken";
export class Jwt {
    private static SECRET: string = process.env.JWT_SECRET!;
    private static EXPIRED: number = process.env.JWT_EXPIRED as unknown as number;
    private static REFRESH_SECRET: string = process.env.JWT_REFRESH_SECRET!;
    private static REFRESH_EXPIRED: number = process.env.JWT_REFRESH_EXPIRED as unknown as number;
    static generateToken(payload: JwtPayload) {
        const accessToken = jsonwebtoken.sign(payload, this.SECRET, {
            expiresIn: this.EXPIRED
        });
        const refreshToken = jsonwebtoken.sign(payload, this.REFRESH_SECRET, {
            expiresIn: this.REFRESH_EXPIRED
        })
        return { accessToken, refreshToken }
    }

    static verifyToken(token: string) {
        try {
            const decoded = jsonwebtoken.verify(token, this.SECRET);
            return decoded;
        } catch {
            return false;
        }
    }

    static verifyRefreshToken(token: string) {
        try {
            const decoded = jsonwebtoken.verify(token, this.REFRESH_SECRET);
            return decoded;
        } catch {
            return false;
        }
    }

    static decodeToken(token: string) {
        //Decode payload của jwt token bất kỳ (Không cần xác minh)
        return jsonwebtoken.decode(token);
    }
}

//sign jwt
// - secret key
// - expire
// - data