import z from "zod";

export const createSkillSchema = z.object({
    skillId: z.number({ error: "SkilID is number" })
})