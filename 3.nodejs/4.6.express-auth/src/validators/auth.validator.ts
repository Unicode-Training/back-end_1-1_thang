import z from "zod";

export const registerSchema = z.object({
    name: z.string({ error: "Name is required" }),
    email: z.string({ error: "Email is required" }).pipe(z.email("Email is invalid")),
    password: z.string({ error: "Password is required" })
})