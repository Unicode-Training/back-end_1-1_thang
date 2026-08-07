
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