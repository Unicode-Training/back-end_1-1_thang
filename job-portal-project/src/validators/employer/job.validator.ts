import z from "zod";

export const createJobSchema = z.object({
    addressId: z.number({ error: "Address ID is string" }).optional(),
    levelId: z.number({ error: "Level ID is number" }),
    expId: z.number({ error: "Exp ID is number" }),
    quantity: z.number({ error: "Quantity is number" }),
    name: z.string({ error: "Name is string" }),
    description: z.string({ error: "Description is string" }),
    requirement: z.string({ error: "Requirement is string" }),
    interests: z.array(z.number()).min(1),
    skills: z.array(z.number()).min(1),
    salaryId: z.number({ error: "Salary ID is number" }),
    expire: z.iso.date()
});

export type JobCreateData = z.infer<typeof createJobSchema>;