import HttpException from "../../exceptions/http.exception";
import { prisma } from "../../libs/prisma"
import { JobUpdateData } from "../../types/job.type";

import { JobCreateData } from "../../validators/employer/job.validator";
import { companyService } from "./company.service";
import moment from "moment";

export const jobService = {
    findAll() {
        return prisma.job.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                level: true,
                exp: true
            },

        });
    },

    async find(id: number) {
        const data = await prisma.job.findUnique({
            where: { id },
            include: {
                company: {
                    include: {
                        companyAddresses: {
                            include: {
                                province: true,
                                ward: true
                            }
                        },
                        industry: true,
                        scale: true
                    }
                },
                jobSkills: {
                    include: {
                        skill: true
                    }
                },
                jobInterests: {
                    include: {
                        interest: true
                    }
                },
                exp: true,
                level: true,
                work: true,
                salary: true
            }
        });
        if (!data) {
            throw new HttpException("Job not found", 404);
        }
        const { company, ...job } = data;
        const { companyAddresses, ...companyInfo } = company;

        return {
            ...job,
            company: companyInfo,
            address: job.addressId ? companyAddresses.find(val => val.id === job.addressId) : companyAddresses.find(val => val.isHeadquarter),
            ...(data.expire ? { expire: moment(data.expire).format('YYYY-MM-DD') } : {})
        };
    },

    async create(data: JobCreateData, companyId: number) {
        const { interests, skills, addressId, expire, ...jobData } = data;
        const isCompanyVerified = await companyService.isVerified(companyId);
        if (!isCompanyVerified) {
            throw new HttpException("Company is unverified", 403);
        }
        return prisma.job.create({
            data: {
                ...jobData,
                companyId,
                addressId: addressId!,
                jobSkills: {
                    createMany: {
                        data: skills.map((val) => ({ skillId: val }))
                    }
                },
                jobInterests: {
                    createMany: {
                        data: interests.map(val => ({ interestId: val }))
                    }
                },
                ...(expire ? { expire: new Date(expire) } : {})
            }
        })
    },

    async update(data: JobUpdateData, id: number) {
        if (!data) {
            throw new HttpException('Body is empty');
        }

        const { interests, skills, expire, ...jobData } = data;

        return await prisma.$transaction(async (tx) => {
            if (skills) {
                //Lấy skillId từ bảng job_skills
                const skillIds = await prisma.jobSkill.findMany({
                    where: {
                        jobId: id
                    }
                });
                //So sánh lấy những skillId cần thêm
                const onSkillIdCreate = skills.filter((skillId) => !skillIds.find(val => val.skillId === skillId));

                //So sánh lấy những skillId cần xóa trên DB
                const onSkillIdDelete = skillIds.filter((val) => !skills.includes(val.skillId));

                await tx.jobSkill.createMany({
                    data: onSkillIdCreate.map((val) => ({
                        jobId: id,
                        skillId: val
                    }))
                });

                await tx.jobSkill.deleteMany({
                    where: {
                        id: {
                            in: onSkillIdDelete.map(val => val.id)
                        }
                    }
                })

            }

            if (interests) {
                //Lấy interestId từ bảng job_interests
                const interestIds = await prisma.jobInterest.findMany({
                    where: {
                        jobId: id
                    }
                });

                //So sánh lấy những InterestId cần thêm
                const onInterestIdCreate = interests.filter((interestId) => !interestIds.find(val => val.interestId === interestId));

                //So sánh lấy những InterestId cần xóa trên DB
                const onInterestIdDelete = interestIds.filter((val) => !interests.includes(val.interestId));


                await tx.jobInterest.createMany({
                    data: onInterestIdCreate.map((val) => ({
                        jobId: id,
                        interestId: val
                    }))
                });

                await tx.jobInterest.deleteMany({
                    where: {
                        id: {
                            in: onInterestIdDelete.map(val => val.id)
                        }
                    }
                })
            }

            const job = await tx.job.update({
                where: { id },
                data: {
                    ...jobData,
                    ...(expire ? { expire: new Date(expire) } : {}),
                }
            });

            return job;
        });

    },

    async delete(id: number) {
        return prisma.$transaction(async (tx) => {
            await tx.jobSkill.deleteMany({
                where: {
                    jobId: id
                }
            });

            await tx.jobInterest.deleteMany({
                where: {
                    jobId: id
                }
            });

            const job = await tx.job.delete({
                where: { id }
            });

            return job;
        })
    }
}