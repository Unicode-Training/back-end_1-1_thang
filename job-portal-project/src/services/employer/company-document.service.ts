import { prisma } from "../../libs/prisma"
import { CompanyDocument } from "../../prisma/generated/prisma/client";

export const companyDocumentService = {
    findAll(id: number, userId: number) {
        return prisma.companyDocument.findMany({
            where: {
                company: {
                    employerProfiles: {
                        some: {
                            userId
                        }
                    }
                }
            }
        });
    },

    async create(data: CompanyDocument, userId: number) {
        //Get company
        const profile = await prisma.employerProfile.findUnique({
            where: { userId }
        });


        return prisma.companyDocument.create({
            data: {
                ...data,
                companyId: profile?.companyId!
            }
        })
    },

    update(data: CompanyDocument, id: number, userId: number) {
        return prisma.companyDocument.update({
            where: {
                id,
                company: {
                    employerProfiles: {
                        some: {
                            userId
                        }
                    }
                }
            },
            data
        });
    },

    delete(id: number, userId: number) {
        return prisma.companyDocument.delete({
            where: {
                id,
                company: {
                    employerProfiles: {
                        some: {
                            userId
                        }
                    }
                }
            }
        })
    }
}