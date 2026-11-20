import { QUEUE_JOB } from "../../constants/queue.constant";
import HttpException from "../../exceptions/http.exception";
import { prisma } from "../../libs/prisma"
import { JobApply } from "../../prisma/generated/prisma/client";
import { JobApplyStatusEnum } from "../../prisma/generated/prisma/enums";
import { jobApplyQueue } from "../../queue/job-apply.queue";

export const jobApplyService = {
    async findAllApply(userId: number) {
        const candidate = await prisma.candidate.findUnique({
            where: {
                userId
            },
            include: {
                jobApplies: {
                    include: {
                        job: {
                            include: {
                                company: {
                                    include: {
                                        companyAddresses: {
                                            include: {
                                                province: true
                                            }
                                        }
                                    }
                                },
                                work: true
                            }
                        }
                    }
                }
            }
        });
        if (!candidate) {
            throw new HttpException("Candidate not found", 404);
        }
        const { jobApplies } = candidate;
        return jobApplies.map(({ job: item, createdAt, status, id }) => {
            const { company, ...job } = item;
            const { companyAddresses, ...companyInfo } = company;
            const address = job.addressId ? companyAddresses.find(val => val.id === job.addressId) : companyAddresses.find(val => val.isHeadquarter)
            return {
                ...job,
                company: companyInfo,
                address,
                submittedAt: createdAt,
                applyStatus: status,
                applyId: id
            }
        });
    },

    async findApply(applyId: number, userId: number) {
        const candidate = await prisma.candidate.findUnique({
            where: {
                userId
            }
        });
        if (!candidate) {
            throw new HttpException("Candidate not found", 404);
        }
        const jobApply = await prisma.jobApply.findUnique({
            where: {
                id: applyId,
                candidateId: candidate.id
            },
            include: {
                jobApplyStatuses: {
                    orderBy: {
                        createdAt: 'asc'
                    }
                }
            }
        }
        );
        if (!jobApply) {
            throw new HttpException("Job Apply Not Found", 404);
        }
        const { jobApplyStatuses } = jobApply;
        return jobApplyStatuses;
    },

    async apply(jobId: number, userId: number) {

        const candidate = await prisma.candidate.findUnique({
            where: { userId }
        });

        if (!candidate) {
            throw new HttpException("Candidate not found", 404);
        }
        const data = await prisma.jobApply.create({
            data: {
                jobId,
                candidateId: candidate.id
            }
        });

        await jobApplyQueue.add(QUEUE_JOB.ADD_JOB_APPLY_STATUS, {
            status: data.status,
            applyId: data.id,
        });

        return data;
    },

    async updateApplyStatus(id: number, userId: number, data: JobApply) {
        const candidate = await prisma.candidate.findUnique({
            where: { userId }
        });

        if (!candidate) {
            throw new HttpException("Candidate not found", 404);
        }
        const jobApply = await prisma.jobApply.update({
            where: {
                id,
                candidateId: candidate.id
            },
            data
        });

        await jobApplyQueue.add(QUEUE_JOB.ADD_JOB_APPLY_STATUS, {
            status: jobApply.status,
            applyId: jobApply.id,
        });

        return jobApply;
    },

    async createjobApplyStatus(status: JobApplyStatusEnum, applyId: number) {
        return prisma.jobApplyStatus.create({
            data: {
                status,
                applyId
            }
        })
    }
}