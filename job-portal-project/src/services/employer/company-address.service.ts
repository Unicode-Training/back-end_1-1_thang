import HttpException from "../../exceptions/http.exception";
import { prisma } from "../../libs/prisma"
import { CompanyAddress } from "../../prisma/generated/prisma/client";

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
    },

    async create(companyId: number, data: CompanyAddress) {
        const existingHeadquarter = await prisma.companyAddress.count({
            where: {
                isHeadquarter: true
            }
        });
        if (existingHeadquarter && data.isHeadquarter) {
            throw new HttpException("Headquarter existing");
        }
        return prisma.companyAddress.create({
            data: {
                ...data,
                companyId
            }
        })
    },

    async updateHeadquarter(id: number) {
        return await prisma.$transaction(async (tx) => {
            await tx.companyAddress.updateMany({
                where: {
                    isHeadquarter: true
                },
                data: {
                    isHeadquarter: false
                }
            })

            return await tx.companyAddress.update({
                where: {
                    id
                },
                data: {
                    isHeadquarter: true
                }
            });

        })
    },

    async update(id: number, data: CompanyAddress) {
        return prisma.companyAddress.update({
            where: { id },
            data
        })
    },

    async delete(id: number) {
        return prisma.companyAddress.delete({
            where: { id }
        })
    }
}