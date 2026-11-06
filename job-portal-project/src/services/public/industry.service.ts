import { prisma } from "../../libs/prisma"
import { IndustryQuery } from "../../types/industry.type";

export const industryService = {
    async findAll(query: IndustryQuery) {

        const page = query.page ? +query.page : 1;
        const limit = query.limit ? +query.limit : 10;

        return Promise.all([
            prisma.industry.findMany({
                orderBy: {
                    [query.sort ?? 'createdAt']: query.order ?? 'asc'
                },
                take: limit,
                skip: (page - 1) * limit,
                where: {
                    name: {
                        contains: query.q ?? ''
                    }
                }
            }),
            prisma.industry.count({
                where: {
                    name: {
                        contains: query.q ?? ''
                    }
                }
            })
        ])

    }
}