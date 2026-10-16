import HttpException from "../exceptions/http.exception";
import { prisma } from "../libs/prisma";
import { User } from "../prisma/generated/prisma/client";
import { Hash } from "../utils/hashing";

export const userService = {
    async create(data: User) {
        const existing = await prisma.user.count({
            where: {
                email: data.email
            }
        });
        if (existing) {
            throw new HttpException("Email existing", 409);
        }
        return prisma.user.create({
            omit: {
                password: true
            },
            data: {
                ...data,
                ...(data.password ? { password: Hash.make(data.password) } : {})
            }
        })
    },

    async findByEmail(email: string) {
        return prisma.user.findUnique({
            where: { email }
        })
    },

    async find(id: number) {
        const data = await prisma.user.findUnique({
            where: { id },
            omit: {
                password: true
            }
        });
        if (!data) {
            throw new HttpException("User not found", 404);
        };
        return data;
    }
}