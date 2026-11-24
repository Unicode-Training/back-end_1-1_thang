import { QUEUE_JOB } from "../../constants/queue.constant";
import HttpException from "../../exceptions/http.exception";
import { prisma } from "../../libs/prisma"
import { JobApplyStatus, User } from "../../prisma/generated/prisma/client";
import { emailQueue } from "../../queue/email.queue";
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

    async apply(jobId: number, user: Omit<User, 'password'>, meta?: { applyUrl: string }) {

        const candidate = await prisma.candidate.findUnique({
            where: { userId: user.id }
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

        const job = await prisma.job.findUnique({
            where: {
                id: jobId
            },
            select: {
                name: true
            }
        })

        await jobApplyQueue.add(QUEUE_JOB.ADD_JOB_APPLY_STATUS, {
            status: data.status,
            applyId: data.id,
        });

        await emailQueue.add(QUEUE_JOB.SEND_EMAIL_APPLY_JOB, {
            email: user.email,
            name: user.name,
            jobName: job?.name,
            applyStatus: data.status,
            applyUrl: meta?.applyUrl ? meta?.applyUrl.replace(/\/+$/, '') + '/' + data.id : process.env.FRONTEND_URL
        })

        return data;
    },

    async createjobApplyStatus(data: JobApplyStatus, applyId: number) {
        return prisma.jobApplyStatus.create({
            data: {
                ...data,
                applyId
            }
        })
    },

    async cancelJobApply(id: number) {
        const currentApply = await prisma.jobApply.findUnique({
            where: {
                id
            }
        })
        const data = await prisma.jobApply.update({
            where: {
                id
            },
            data: {
                status: 'CANCEL'
            },
            include: {
                candidate: {
                    include: {
                        user: true
                    }
                },
                job: true
            }
        });

        const user = data.candidate.user;
        const job = data.job;
        if (currentApply?.status !== 'CANCEL') {
            await jobApplyQueue.add(QUEUE_JOB.ADD_JOB_APPLY_STATUS, {
                status: data.status,
                applyId: data.id,
            });

            await emailQueue.add(QUEUE_JOB.SEND_EMAIL_STATUS_APPLY_JOB, {
                email: user.email,
                name: user.name,
                jobName: job?.name,
                applyStatus: data.status,
            })
        }

        return data;
    }
}