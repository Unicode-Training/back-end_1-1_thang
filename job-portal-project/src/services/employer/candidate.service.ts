import moment from "moment";
import { prisma } from "../../libs/prisma"
import HttpException from "../../exceptions/http.exception";
import { CandidateQuery } from "../../types/candidate.type";

export const candidateService = {
    async findAll(query: CandidateQuery) {
        const { limit = 9, page = 1, q = '', provinceId, skillIds } = query;
        const skillIdArray = skillIds?.split(',').filter(val => val).map(val => +val);
        const where = {
            ...(q ? {
                OR: [
                    {
                        user: {
                            OR: [
                                {
                                    name: {
                                        contains: q
                                    }
                                },
                                {
                                    email: {
                                        contains: q
                                    }
                                },
                            ]
                        }
                    },
                    {
                        phone: {
                            contains: q
                        }
                    }
                ]

            } : {}),

            ...(provinceId ? {
                provinceId
            } : {}),

            ...(skillIds ? {
                candidateSkills: {
                    some: {
                        skillId: {
                            in: skillIdArray
                        }
                    }

                }
            } : {})
        }

        const [candidateList, count] = await Promise.all([
            prisma.candidate.findMany({
                include: {
                    user: true,
                    candidateExps: {
                        orderBy: {
                            startDate: 'asc'
                        }
                    },
                    candidateSkills: {
                        include: {
                            skill: true
                        }
                    },
                    province: true,
                    ward: true
                },
                take: +limit,
                skip: (page - 1) * limit,
                where
            }),
            prisma.candidate.count({
                where
            })
        ]);

        return [
            candidateList.map(({ user, candidateSkills, ...item }) => {
                const { candidateExps } = item;
                const expNumber = candidateExps.reduce((acc, cur) => {
                    const start = moment(cur.startDate);
                    const end = moment(cur.endDate || undefined);
                    const diffSeconds = end.diff(start, 'seconds');
                    return acc + diffSeconds;
                }, 0);
                return ({
                    ...item,
                    name: user.name,
                    email: user.email,
                    status: user.status,
                    skills: candidateSkills.map(({ skill }) => skill),
                    expNumber
                })
            }),
            count
        ]
    },

    async find(id: number) {
        const candidate = await prisma.candidate.findUnique({
            where: { id },
            include: {
                user: true,
                candidateExps: {
                    orderBy: {
                        startDate: 'asc'
                    }
                },
                candidateSkills: {
                    include: {
                        skill: true
                    }
                },
                province: true,
                ward: true,
                candidateEducations: {
                    orderBy: {
                        startYear: 'asc'
                    }
                },
                jobApplies: {
                    include: {
                        job: true
                    }
                }
            },

        });
        if (!candidate) {
            throw new HttpException("Candidate not found", 400);
        }

        const { user, candidateSkills, ...data } = candidate;
        const { candidateExps } = data;
        const expNumber = candidateExps.reduce((acc, cur) => {
            const start = moment(cur.startDate);
            const end = moment(cur.endDate || undefined);
            const diffSeconds = end.diff(start, 'seconds');
            return acc + diffSeconds;
        }, 0);
        return {
            ...data,
            name: user.name,
            email: user.email,
            status: user.status,
            expNumber,
            skills: candidateSkills.map(({ skill }) => skill),
        };

    }
}