import z from "zod";

export const createEducationSchema = z.object({
    schoolName: z.string({ error: "schoolName is required" }),
    schoolLogo: z.string({ error: "schoolLogo is string" }).optional(),
    specialized: z.string({ error: "specialized is string" }),
    startYear: z.string({ error: "startYear is string" }).regex(/^\d{4}$/, 'startYear is format: YYYY').transform((val) => new Date(val)),
    endYear: z.string({ error: "endYear is string" }).regex(/^\d{4}$/, 'endYear is format: YYYY').transform(val => val ? new Date(val) : undefined).optional()
})