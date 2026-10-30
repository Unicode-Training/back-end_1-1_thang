import { prisma } from "../../libs/prisma"
import { EmployerProfile } from "../../prisma/generated/prisma/client";
import { Hash } from "../../utils/hashing";
import { EmployerProfile as EmployerProfileValidator } from "../../validators/employer/employer-profile.validator";

export const employerProfileService = {
    async findAll(userId: number) {
        //Get company from user login
        const profile = await prisma.employerProfile.findUnique({
            where: { userId }
        });

        const data = await prisma.employerProfile.findMany({
            where: {
                companyId: profile!.companyId!
            },
            include: {
                user: {
                    omit: {
                        password: true
                    }
                }
            }
        });
        return data.map((item) => {
            return {
                ...item.user,
                isOwner: item.isOwner,
                position: item.position,
                bio: item.bio,
                verificationStatus: item.verificationStatus,

            }
        })
    },

    async create(data: EmployerProfileValidator, companyId: number) {

        return prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: Hash.make(data.password),
                status: data.status!,
                role: "EMPLOYER",
                employerProfile: {
                    create: {
                        position: data.position!,
                        bio: data.bio!,
                        companyId,
                        verificationStatus: data.verificationStatus!
                    }
                }
            }
        })
    },

    async assignProfile(data: EmployerProfile, companyId: number) {
        return prisma.employerProfile.create({
            data: {
                ...data,
                companyId
            }
        })
    },

    async delete(id: number, companyId: number) {
        return prisma.employerProfile.delete({
            where: {
                id,
                companyId
            }
        })
    }
}