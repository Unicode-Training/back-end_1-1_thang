import z from "zod";

export const createCompanySchema = z.object({
    name: z.string({ error: "Name is required" }),
    taxNumber: z.string({ error: "Tax number is required" }),
    industryId: z.number({ error: "industryId is number" }).optional(),
    scaleId: z.number({ error: "scaleId is number" }).optional(),
    logo: z.string({ error: "Logo is string" }).optional(),
    website: z.url({ error: "Website is url" }).optional(),
    shortDescription: z.string({ error: "Short Description is string" }).optional(),
    description: z.string({ error: "Description is string" }).optional()
});

export const updateCompanySchema = z.object({
    name: z.string({ error: "Name is required" }).optional(),
    taxNumber: z.string({ error: "Tax number is required" }).optional(),
    industryId: z.number({ error: "industryId is number" }).optional(),
    scaleId: z.number({ error: "scaleId is number" }).optional(),
    logo: z.string({ error: "Logo is string" }).optional(),
    website: z.url({ error: "Website is url" }).optional(),
    shortDescription: z.string({ error: "Short Description is string" }).optional(),
    description: z.string({ error: "Description is string" }).optional()
});