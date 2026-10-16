import HttpException from "../exceptions/http.exception";
import { User } from "../prisma/generated/prisma/client";
import { Hash } from "../utils/hashing";
import { Jwt } from "../utils/jwt";
import { userService } from "./user.service";

export const authService = {
    async login({ email, password }: User) {
        const user = await userService.findByEmail(email);
        if (!user) {
            throw new HttpException("Email or password invalid");
        }
        if (!Hash.verify(user.password!, password!)) {
            throw new HttpException("Email or password invalid");
        }

        const token = Jwt.generateToken({
            jti: crypto.randomUUID(),
            id: user.id
        });

        const data = { ...user } as Partial<User>
        delete data.password;

        return {
            ...token,
            user: data
        };
    },
    async register(regsiterData: User) {
        const user = await userService.create(regsiterData);
        const token = Jwt.generateToken({
            jti: crypto.randomUUID(),
            id: user.id
        });

        return {
            ...token,
            user
        };
    },

}