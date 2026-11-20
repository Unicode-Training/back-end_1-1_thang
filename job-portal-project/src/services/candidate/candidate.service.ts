import HttpException from "../../exceptions/http.exception";
import { prisma } from "../../libs/prisma";
import { Candidate, CandidateEducation, CandidateSkill } from "../../prisma/generated/prisma/client";
import { CandidateExpCreateInput, CandidateUpdateInput, UserUpdateInput } from "../../prisma/generated/prisma/models";
import { userService } from "../user.service";

export const candidateService = {
    create(data: Partial<Candidate>) {
        return prisma.candidate.create({
            data
        })
    },

    async find(userId: number) {
        const candidate = await prisma.candidate.findUnique({
            where: {
                userId
            },
            include: {
                user: true
            }
        });
        if (!candidate) {
            throw new HttpException("Candidate not found");
        }
        const { user, ...data } = candidate;
        return {
            name: user.name,
            email: user.email,
            status: user.status,
            role: user.role,
            ...data,
        };
    },

    async updateProfile({ name, email, ...data }: CandidateUpdateInput & UserUpdateInput, userId: number) {

        if (email) {
            const existing = await userService.existingEmail(email as string, userId);
            if (existing) {
                throw new HttpException("Email existing", 409);
            }
        }

        const { user: userRes, ...candidate } = await prisma.candidate.update({
            where: {
                userId
            },
            include: {
                user: true
            },
            data: {
                ...data,
                user: {
                    update: {
                        ...(name ? { name } : {}),
                        ...(email ? { email } : {}),
                    }
                }
            }
        });

        return {
            name: userRes.name,
            email: userRes.email,
            status: userRes.status,
            role: userRes.role,
            ...candidate,
        };
    },

    async findExps(userId: number) {
        const candidate = await prisma.candidate.findUnique({
            where: {
                userId
            },
            include: {
                candidateExps: {
                    orderBy: {
                        startDate: 'desc'
                    }
                }
            },

        });
        if (!candidate) {
            throw new HttpException('Candidate not found', 404);
        }
        const { candidateExps } = candidate;
        return candidateExps;
    },

    async createExp(data: Omit<CandidateExpCreateInput, 'candidate'>, userId: number) {

        const candidate = await prisma.candidate.findUnique({
            where: { userId }
        })
        return prisma.candidateExp.create({
            data: {
                ...data,
                candidateId: candidate!.id
            }
        })
    },

    async findEducations(userId: number) {
        const candidate = await prisma.candidate.findUnique({
            where: {
                userId
            },
            include: {
                candidateEducations: {
                    orderBy: {
                        startYear: 'desc'
                    }
                }
            },

        });
        if (!candidate) {
            throw new HttpException('Candidate not found', 404);
        }
        const { candidateEducations } = candidate;
        return candidateEducations;
    },

    async createEducation(data: Omit<CandidateEducation, 'candidate'>, userId: number) {

        const candidate = await prisma.candidate.findUnique({
            where: { userId }
        })
        return prisma.candidateEducation.create({
            data: {
                ...data,
                candidateId: candidate!.id
            }
        })
    },

    async findSkill(userId: number) {
        const candidate = await prisma.candidate.findUnique({
            where: {
                userId
            },
            include: {
                candidateSkills: {
                    include: {
                        skill: true
                    }
                }
            },

        });
        if (!candidate) {
            throw new HttpException('Candidate not found', 404);
        }
        const { candidateSkills } = candidate;
        return candidateSkills.map(val => val.skill);
    },

    async createSkill(data: Omit<CandidateSkill, 'candidate'>, userId: number) {

        const candidate = await prisma.candidate.findUnique({
            where: { userId }
        })
        return prisma.candidateSkill.create({
            data: {
                ...data,
                candidateId: candidate!.id
            }
        })
    },
}