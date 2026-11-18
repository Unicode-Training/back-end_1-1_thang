import z from "zod";

export const updateProfileSchema = z.object({
    name: z.string({ error: 'Name is string' }).optional(),
    email: z.string({ error: "Email is string" }).pipe(z.email("Email invalid")).optional(),
    phone: z.string({ error: "Phone is string" }).regex(/^(0|\+84)\d{9}$/, 'Phone invalid').optional(),
    website: z.url("Website is url").optional(),
    address: z.string({ error: "Address is string" }).optional(),
    avatar: z.string({ error: "Avatar is string" }).optional(),
    isLookingJob: z.boolean().optional(),
    cvFile: z.string({ error: "CV file is string" }).optional()
})
