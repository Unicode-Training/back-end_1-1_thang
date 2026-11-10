import moment from "moment";
import HttpException from "../../exceptions/http.exception";
import { prisma } from "../../libs/prisma"
import { JobWhereInput } from "../../prisma/generated/prisma/models";
import { JobPublicQuery } from "../../types/job.type";

export const jobService = {
    async findAll(query: JobPublicQuery) {
        const limit = query.limit ? +query.limit : 10;
        const page = query.page ? +query.page : 1;
        const q = query.q ?? '';
        const industryId = query.industryId?.split(',').filter(val => val).map(val => +val);
        const skillId = query.skillId?.split(',').filter(val => val).map(val => +val);
        const expId = query.expId?.split(',').filter(val => val).map(val => +val);
        const workId = query.workId?.split(',').filter(val => val).map(val => +val);
        const salaryId = query.salaryId?.split(',').filter(val => val).map(val => +val);
        const provinceId = query.provinceId ? +query.provinceId : null;
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
            ...(query.industryId ? {
                company: {
                    industryId: {
                        in: industryId
                    }
                }
            } : {}),
            ...(query.skillId ? {
                jobSkills: {
                    some: {
                        skillId: {
                            in: skillId
                        }
                    }
                }
            } : {}),
            ...(query.expId ? {
                expId: {
                    in: expId
                }
            } : {}),
            ...(query.workId ? {
                workId: {
                    in: workId
                }
            } : {}),
            ...(query.salaryId ? {
                salaryId: {
                    in: salaryId
                }
            } : {}),
            ...(provinceId ? {

                OR: [
                    {
                        address: {
                            provinceId
                        }
                    },
                    {
                        addressId: null, //chặn việc lọt job có addressId khác null
                        company: {
                            companyAddresses: {
                                some: {
                                    provinceId,
                                    isHeadquarter: true
                                }
                            }
                        }
                    }
                ]

            } : {})
        } as JobWhereInput;

        const [data, count] = await Promise.all([
            prisma.job.findMany({
                orderBy: {
                    ...(query.sort === 'salary' ? {
                        salary: {
                            position: 'desc'
                        }
                    } : {}),
                    ...(query.sort !== 'salary' && query.sort !== 'related' ? { [query.sort ?? 'createdAt']: query.order ?? 'desc' } : {})
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
        const { company, jobSkills, jobInterests, ...job } = data;
        const { companyAddresses, ...companyInfo } = company;

        return {
            ...job,
            company: companyInfo,
            address: job.addressId ? companyAddresses.find(val => val.id === job.addressId) : companyAddresses.find(val => val.isHeadquarter),
            skills: jobSkills.map(val => val.skill),
            interests: jobInterests.map(val => val.interest),
            ...(data.expire ? { expire: moment(data.expire).format('YYYY-MM-DD') } : {})
        };

    },

    async related(id: number, limit: number) {
        //Lấy skill của job hiện tại
        const job = await prisma.job.findUnique({
            where: { id },
            include: {
                jobSkills: {
                    include: {
                        skill: true
                    }
                },
                company: {
                    include: {
                        companyAddresses: true
                    }
                },

            }
        });
        if (!job) {
            throw new HttpException("Job not found", 404);
        }
        const { jobSkills } = job;
        const skills = jobSkills.map(val => val.skillId);
        const address = job.company.companyAddresses.find(val => val.isHeadquarter);
        const where = {
            id: {
                not: id
            },
            OR: [
                {
                    jobSkills: {
                        some: {
                            skillId: {
                                in: skills
                            }
                        }
                    }
                },
                {
                    company: {
                        industryId: job.company.industryId
                    }
                },
                {
                    company: {
                        companyAddresses: {
                            some: {
                                provinceId: address!.provinceId
                            }
                        }
                    }
                },
                {
                    salaryId: job.salaryId
                }
            ]

        }
        const total = await prisma.job.count({
            where
        });
        const skip = Math.floor(Math.random() * total);
        const data = await prisma.job.findMany({
            where,
            take: +limit,
            skip
        });

        return data;
    }
}

//Lọc tỉnh/thành phố
// - Nếu có addressId trong bảng jobs -> ưu tiên lấy theo addressId
// - Nếu không có addressId trong bảng jobs -> truy vấn theo company (Chỉ truy vấn theo trụ sở)

//Pending: Sắp xếp theo sự liên quan của từ khóa

//Related: Nên để ngẫu nhiên -> Tăng sự lựa chọn -> Prisma không hỗ trợ -> Viết bằng SQL thuần