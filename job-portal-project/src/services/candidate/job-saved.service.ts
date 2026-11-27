import HttpException from "../../exceptions/http.exception";
import { prisma } from "../../libs/prisma"

export const jobSavedService = {
    getCandidate(userId: number) {
        return prisma.candidate.findUnique({
            where: {
                userId
            }
        })
    },
    async saved(jobId: number, userId: number) {
        const candidate = await this.getCandidate(userId);
        const jobExisting = await prisma.job.count({
            where: {
                verificationStatus: 'APPROVE',
                id: jobId
            }
        });
        if (!jobExisting) {
            throw new HttpException('Job Not Found', 404);
        }
        return prisma.jobSaved.create({
            data: {
                candidateId: candidate!.id,
                jobId
            }
        })
    },

    async unsaved(jobId: number, userId: number) {
        const candidate = await this.getCandidate(userId);
        return prisma.jobSaved.deleteMany({
            where: {
                candidateId: candidate!.id,
                jobId
            }
        })
    },

    async findAllSaved(userId: number) {
        const candidate = await this.getCandidate(userId);
        return prisma.jobSaved.findMany({
            where: {
                candidateId: candidate!.id
            },
            include: {
                job: true
            }
        })
    }
}