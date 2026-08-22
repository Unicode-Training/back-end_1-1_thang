import { StatusCodes } from "http-status-codes";
import HttpException from "../exceptions/http.exception";
import { prisma } from "../libs/prisma";
import { Prisma } from "../prisma/generated/prisma/client";
import { Product, ProductQuery } from "../types/product.type";
import { ProductWhereInput } from "../prisma/generated/prisma/models";

export const productService = {
    existingSku(sku: string) {
        return prisma.product.count({
            where: {
                sku,
            },
        });
    },

    async findAll({ fields = '', q = "", status, sku, minPrice, maxPrice, sort = "id", order = "asc", page = 1, limit = 3 }: ProductQuery) {
        const select = fields.split(',').filter(val => val).reduce((acc, cur) => {
            acc[cur.trim()] = true;
            return acc;
        }, {} as { [key: string]: boolean });

        const filters = {} as ProductWhereInput;

        if (q) {
            filters.OR = [
                {
                    name: {
                        contains: q.trim()
                    }
                },
                {
                    description: {
                        contains: q.trim()
                    }
                },
                {
                    shortDescription: {
                        contains: q.trim()
                    }
                }
            ]
        }

        if (status) {
            filters.status = status;
        }

        if (sku) {
            filters.sku = {
                contains: sku
            }
        }

        if (minPrice || maxPrice) {
            filters.AND = [];
            if (minPrice) {
                filters.AND.push({
                    price: {
                        gte: +minPrice
                    }
                })
            }

            if (maxPrice) {
                filters.AND.push({
                    price: {
                        lte: +maxPrice
                    }
                })
            }
        }

        const [data, count] = await Promise.all([
            prisma.product.findMany({
                ...(Object.keys(select).length ? { select } : {}),
                where: filters,
                orderBy: {
                    [sort]: order
                },
                take: +limit,
                skip: (page - 1) * limit,
            }),
            prisma.product.count({
                where: filters,
            })
        ]);

        return {
            data,
            count
        }
    },

    create({ images = [], attributes = [], ...data }: Product) {
        const dataCreate = {
            ...data,
        } as Prisma.ProductCreateInput;
        if (images.length) {
            dataCreate.images = {
                createMany: {
                    data: images.map((item) => ({
                        imageUrl: item,
                    })),
                },
            };
        }
        if (attributes.length) {
            dataCreate.attributeValues = {
                createMany: {
                    data: attributes.reduce(
                        (
                            acc: { attributeId: number; attributeValueId: number }[],
                            { attributeId, values },
                        ) => {
                            values.forEach((value) => {
                                acc.push({
                                    attributeId,
                                    attributeValueId: value,
                                });
                            });
                            return acc;
                        },
                        [],
                    ),
                },
            };
        }
        return prisma.product.create({
            data: dataCreate,
        });
    },

    async find(id: number) {
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                images: true,
                attributeValues: {
                    include: {
                        attribute: true,
                        attributeValue: true,
                    },
                },
            },
        });
        if (!product) {
            throw new HttpException("Product not found", StatusCodes.NOT_FOUND);
        }

        return {
            ...product,
            attributeValues: product.attributeValues.reduce((acc: any, cur: any) => {
                if (!acc.find((item: any) => item.id === cur.attribute.id)) {
                    acc.push({
                        ...cur.attribute,
                        values: product.attributeValues.reduce(
                            (valueAcc: any, valueCur: any) => {
                                if (valueCur.attributeValue.attributeId === cur.attribute.id) {
                                    valueAcc.push(valueCur.attributeValue);
                                }
                                return valueAcc;
                            },
                            [],
                        ),
                    });
                }
                return acc;
            }, []),
        };
    },
};
