import { prisma } from "../libs/prisma"

export const userService = {
    find(id: number) {
        return prisma.user.findUnique({
            where: { id }
        })
    }
}