import HttpException from "../../exceptions/http.exception";
import { prisma } from "../../libs/prisma";
import { Company } from "../../prisma/generated/prisma/client";

export const companyService = {
    async create(companyData: Company, userId: number) {
        return prisma.$transaction(async (tx) => {
            const existing = await tx.company.findUnique({
                where: {
                    taxNumber: companyData.taxNumber
                }
            });
            if (existing) {
                throw new HttpException("Company existing", 409);
            }
            const company = await tx.company.create({
                data: companyData
            });

            await tx.employerProfile.create({
                data: {
                    userId,
                    isOwner: true,
                    companyId: company.id,
                    verificationStatus: "APPROVE"
                }
            })

            return company;
        })

    },

    async update(companyData: Company, userId: number, id: number) {
        return prisma.company.update({
            where: {
                id,
                employerProfiles: {
                    some: {
                        userId
                    }
                }
            },
            data: {
                ...companyData,
                verificationStatus: "PENDING"
            }
        })
    },

    async delete(id: number, userId: number) {
        return prisma.company.delete({
            where: {
                id,
                employerProfiles: {
                    some: {
                        userId
                    }
                }
            }
        })
    },

    async isVerified(id: number) {
        return prisma.company.count({
            where: {
                id,
                verificationStatus: 'APPROVE'
            }
        })
    }
}