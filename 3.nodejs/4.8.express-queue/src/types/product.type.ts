import { ProductStatus } from "../prisma/generated/prisma/enums";

export type Product = {
    name: string,
    sku: string,
    price: number,
    description: string,
    thumbnail: string,
    images: string[],
    attributes: {
        attributeId: number,
        values: number[]
    }[]
}

export type ProductQuery = {
    fields: string;
    q: string;
    status: ProductStatus;
    sku: string;
    minPrice: number;
    maxPrice: number;
    sort: string;
    order: "asc" | "desc";
    page: number;
    limit: number;
}