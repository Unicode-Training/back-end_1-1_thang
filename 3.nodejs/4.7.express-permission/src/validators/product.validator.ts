import z from "zod";
import { productService } from "../services/product.service";

export const createProductSchema = z.object({
    name: z.string({ error: "Tên sản phẩm bắt buộc" }).min(5, "Tên sản phẩm ký tự"),
    sku: z.string({ error: "Mã sản phẩm bắt buộc" }).min(4, "Mã sản phẩm từ 4 ký tự").refine(async (value: string) => {
        //return true => passed
        const count = await productService.existingSku(value);
        return !count;
    }, {
        message: "Mã sản phẩm đã bị trùng"
    }),
    price: z.number({ error: "Giá phải là số" }).min(1000, "Giá phải từ 1000 trở lên"),
    salePrice: z.number({ error: "Giá khuyến mãi phải là số" }).optional(),
    description: z.string({ error: "Mô tả bắt buộc" }),
    shortDescription: z.string({ error: "Mô tả ngắn phải là chuỗi" }).optional(),
    thumbnail: z.string({ error: "Ảnh đại diện bắt buộc" }),
    images: z.array(z.string({ error: "Đường dẫn ảnh phải là chuỗi" })).optional(),
    status: z.enum(['DRAFT', 'PUBLISH']).optional(),
    attributes: z.array(z.object({
        attributeId: z.number({ error: "Attribute ID phải là số" }),
        values: z.array(z.number({ error: "ID Giá trị thuộc tính phải là số" }), "Values phải là 1 mảng").min(1, "Mảng giá trị phải ít nhất 1")
    })).optional()
})