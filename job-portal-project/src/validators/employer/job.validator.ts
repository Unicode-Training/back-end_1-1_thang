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
    expire: z.iso.date(),
    workId: z.number({ error: "Work ID is number" })
});

export const updateJobSchema = z.object({
    addressId: z.number({ error: "Address ID is string" }).optional(),
    levelId: z.number({ error: "Level ID is number" }).optional(),
    expId: z.number({ error: "Exp ID is number" }).optional(),
    quantity: z.number({ error: "Quantity is number" }).optional(),
    name: z.string({ error: "Name is string" }).optional(),
    description: z.string({ error: "Description is string" }).optional(),
    requirement: z.string({ error: "Requirement is string" }).optional(),
    interests: z.array(z.number()).optional(),
    skills: z.array(z.number()).optional(),
    salaryId: z.number({ error: "Salary ID is number" }).optional(),
    expire: z.iso.date().optional(),
    workId: z.number({ error: "Work ID is number" }).optional()
});

export type JobCreateData = z.infer<typeof createJobSchema>;
