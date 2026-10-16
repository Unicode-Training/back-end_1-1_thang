import HttpException from "../../exceptions/http.exception";
import { prisma } from "../../libs/prisma";
import { Company } from "../../prisma/generated/prisma/client";

export const companyService = {
    async create(companyData: Company, userId: number) {
        return prisma.$transaction(async (tx) => {
            const existing = await prisma.company.findUnique({
                where: {
                    taxNumber: companyData.taxNumber
                }
            });
            if (existing) {
                throw new HttpException("Company existing", 409);
            }
            const company = await prisma.company.create({
                data: companyData
            });

            await prisma.employerProfile.create({
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
    }
}