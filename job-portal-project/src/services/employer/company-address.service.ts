import { prisma } from "../../libs/prisma"

export const companyAddressService = {
    findAll(companyId: number) {
        return prisma.companyAddress.findMany({
            where: {
                companyId
            },
            include: {
                province: true,
                ward: true
            }
        });
    }
}