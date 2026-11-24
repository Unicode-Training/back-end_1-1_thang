import { QUEUE_JOB } from "../../constants/queue.constant";
import HttpException from "../../exceptions/http.exception";
import { prisma } from "../../libs/prisma"
import { JobApply } from "../../prisma/generated/prisma/client";
// import { emailQueue } from "../../queue/email.queue";
import { jobApplyQueue } from "../../queue/job-apply.queue";

export const jobApplyService = {
    async findAll() {
        const data = await prisma.jobApply.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                job: true,
                candidate: {
                    include: {
                        user: true
                    }
                }
            }
        });

        return data.map(({ candidate, ...val }) => {
            const { user, ...rest } = candidate;
            return {
                ...val,
                candidate: {
                    ...rest,
                    name: user.name,
                    email: user.email
                }
            }
        })
    },

    async find(id: number) {
        const jobApply = await prisma.jobApply.findUnique({
            where: { id },
            include: {
                jobApplyStatuses: {
                    orderBy: {
                        createdAt: 'asc'
                    }
                },
                candidate: {
                    include: {
                        user: true
                    }
                },
                job: true
            }
        });
        if (!jobApply) {
            throw new HttpException("Job Apply not found", 404);
        }
        const { candidate, ...data } = jobApply;
        const { user, ...rest } = candidate;
        return {
            ...data,
            candidate: {
                ...rest,
                name: user.name,
                email: user.email
            }
        };
    },

    async updateApplyStatus(id: number, { applyUrl, interviewDate, selectedDate, invitation, note, ...data }: JobApply & { applyUrl: string, interviewDate: Date, selectedDate: Date, invitation: string, note: string }) {

        const currentApply = await prisma.jobApply.findUnique({
            where: {
                id,
            },
            select: {
                status: true
            }
        });

        const jobApply = await prisma.jobApply.update({
            where: {
                id,
            },
            include: {
                candidate: {
                    include: {
                        user: true
                    }
                },
                job: true,
                jobApplyStatuses: true
            },
            data
        });

        const user = jobApply.candidate.user;
        const job = jobApply.job;

        if (currentApply?.status !== jobApply.status) {
            await jobApplyQueue.add(QUEUE_JOB.ADD_JOB_APPLY_STATUS, {
                status: jobApply.status,
                ...(interviewDate ? { interviewDate } : {}),
                ...(selectedDate ? { selectedDate } : {}),
                ...(invitation ? { invitation } : {}),
                ...(note ? { note } : {}),
                applyId: jobApply.id,
            });

            await jobApplyQueue.add(QUEUE_JOB.SEND_EMAIL_STATUS_APPLY_JOB, {
                email: user.email,
                name: user.name,
                jobName: job?.name,
                applyStatus: data.status,
                applyUrl: applyUrl ? applyUrl.replace(/\/+$/, '') + '/' + id : process.env.FRONTEND_URL,
                applyId: id
                // interviewDate: jobApplyStatus?.interviewDate,
                // selectedDate: jobApplyStatus?.selectedDate,
                // invitation: jobApplyStatus?.invitation
            })
        }

        return jobApply;
    },
}