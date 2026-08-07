import { StatusCodes } from "http-status-codes";
import HttpException from "../exceptions/http.exception";
import { prisma } from "../libs/prisma";
import { Prisma } from "../prisma/generated/prisma/client";
import { Product } from "../types/product.type";

export const productService = {
    existingSku(sku: string) {
        return prisma.product.count({
            where: {
                sku,
            },
        });
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
