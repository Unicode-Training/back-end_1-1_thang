import z from "zod";

export const createExpSchema = z.object({
    name: z.string({ error: "Name is required" }),
    companyName: z.string({ error: "companyName is required" }),
    companyLogo: z.string({ error: "companyLogo is string" }).optional(),
    description: z.string({ error: "description is string" }).optional(),
    startDate: z.string({ error: "startDate is string" }).regex(/^\d{4}-\d{2}$/, 'startDate is format: YYYY-MM').transform((val) => new Date(val)),
    endDate: z.string({ error: "endDate is string" }).regex(/^\d{4}-\d{2}$/, 'endDate is format: YYYY-MM').transform(val => val ? new Date(val) : undefined).optional()
})