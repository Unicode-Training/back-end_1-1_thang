import z from "zod";

export const createCompanyAddressSchema = z.object({
    provinceId: z.number({ error: "Province ID is number" }),
    wardId: z.number({ error: "Ward ID is number" }),
    address: z.string({ error: "Address is string" }),
    isHeadquarter: z.boolean({ error: "Headquarter is true or false" }).optional()
});

export const updateCompanyAddressSchema = z.object({
    provinceId: z.number({ error: "Province ID is number" }).optional(),
    wardId: z.number({ error: "Ward ID is number" }).optional(),
    address: z.string({ error: "Address is string" }).optional(),
});

