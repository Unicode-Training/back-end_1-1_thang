import HttpException from "../../exceptions/http.exception";
import { prisma } from "../../libs/prisma"

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
                company: {
                    include: {
                        companyAddresses: {
                            include: {
                                province: true,
                                ward: true
                            }
                        }
                    }
                },
                jobSkills: {
                    include: {
                        skill: true
                    }
                }
            }
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
                level: true
            }
        });
        if (!data) {
            throw new HttpException("Job not found", 404);
        }
        return {
            ...data,
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
    }
}