import z from "zod";

export const createEmployerProfileSchema = z.object({
    name: z.string({ error: "Name is required" }),
    email: z.string({ error: "Email is required" }).pipe(z.email('Email invalid')),
    password: z.string({ error: "Password is required" }).min(8, "Password min 8 characters"),
    status: z.enum(['ACTIVE', 'INACTIVE'], "Status is: ACTIVE, INACTIVE").optional(),
    position: z.string({ error: "Position is string" }).optional(),
    bio: z.string({ error: "Bio is string" }).optional(),
    verificationStatus: z.enum(['PENDING', 'APPROVE'], 'Verification Status is PENDING, APPROVE').optional()
});

export const assignEmployerProfileSchema = z.object({
    position: z.string({ error: "Position is string" }).optional(),
    bio: z.string({ error: "Bio is string" }).optional(),
    verificationStatus: z.enum(['PENDING', 'APPROVE'], 'Verification Status is PENDING, APPROVE').optional(),
    userId: z.number({ error: "User ID is number" }),
});

export type EmployerProfile = z.infer<typeof createEmployerProfileSchema>;