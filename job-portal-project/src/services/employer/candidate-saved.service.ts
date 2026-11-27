import HttpException from "../../exceptions/http.exception";
import { prisma } from "../../libs/prisma"

export const candidateSavedService = {
    async getCompanyId(userId: number) {
        const profile = await prisma.employerProfile.findUnique({
            where: {
                userId
            }
        });

        if (!profile) {
            throw new HttpException('Employer profile not found', 404);
        }

        const { companyId } = profile;

        return companyId;
    },
    async save(candidateId: number, userId: number) {

        const companyId = await this.getCompanyId(userId);
        return prisma.candidateSaved.create({
            data: {
                companyId,
                candidateId
            }
        })

    },

    async unsaved(candidateId: number, userId: number) {
        const companyId = await this.getCompanyId(userId);
        return prisma.candidateSaved.deleteMany({
            where: {
                companyId,
                candidateId
            }
        })
    },

    async findAllSaved(userId: number) {
        const companyId = await this.getCompanyId(userId);
        const data = await prisma.candidateSaved.findMany({
            where: {
                companyId
            },
            include: {
                candidate: {
                    include: {
                        user: true
                    }
                }
            }
        });
        return data.map(({ candidate }) => {
            const { user, ...item } = candidate;
            return {
                ...item,
                name: user.name,
                email: user.email,
                status: user.status
            }
        })
    }
}