import { prisma } from "../../libs/prisma"
import { JobWhereInput } from "../../prisma/generated/prisma/models";
import { JobPublicQuery } from "../../types/job.type";

export const jobService = {
    async findAll(query: JobPublicQuery) {

        const limit = query.limit ? +query.limit : 10;
        const page = query.page ? +query.page : 1;
        const q = query.q ?? '';
        const industryId = query.industryId ? +query.industryId : undefined;
        const where = {
            verificationStatus: "APPROVE",
            OR: [
                {
                    name: {
                        contains: q
                    }
                },
                {
                    description: {
                        contains: q
                    }
                }
            ],
            ...(industryId ? {
                company: {
                    industryId
                }
            } : {})
        } as JobWhereInput
        const [data, count] = await Promise.all([
            prisma.job.findMany({
                orderBy: {
                    [query.sort ?? 'createdAt']: query.order
                },
                take: limit,
                skip: (page - 1) * limit,
                where,
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
                    salary: true,
                    jobSkills: {
                        include: {
                            skill: true
                        }
                    }
                }
            }),
            prisma.job.count({
                where
            })
        ]);

        return [
            data.map(item => {
                const { company, jobSkills, ...job } = item;
                const { companyAddresses, ...companyInfo } = company;
                const address = job.addressId ? companyAddresses.find(val => val.id === job.addressId) : companyAddresses.find(val => val.isHeadquarter)
                return {
                    ...job,
                    company: companyInfo,
                    address,
                    addressFormat: `${address?.address}, ${address?.ward.name}, ${address?.province.name}`,
                    skills: jobSkills.map((val) => val.skill)
                }
            }),
            count
        ];
    }
}