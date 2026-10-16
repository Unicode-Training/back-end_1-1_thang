import z from "zod";

export const registerSchema = z.object({
    name: z.string({ error: "Name is required" }),
    email: z.string({ error: "Email is required" }).pipe(z.email('Email invalid')),
    password: z.string({ error: "Password is required" }).min(8, "Password min 8 characters"),
    role: z.enum(['CANDIDATE', 'EMPLOYER'], "Role is: CANDIDATE,EMPLOYER")
})

export const loginSchema = z.object({
    email: z.string({ error: "Email is required" }).pipe(z.email('Email invalid')),
    password: z.string({ error: "Password is required" }),
})