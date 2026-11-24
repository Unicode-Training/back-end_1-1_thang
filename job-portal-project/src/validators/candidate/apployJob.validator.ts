import z from "zod";

export const applyJobSchema = z.object({
    applyUrl: z.url({ error: "ApplyUrl is URL format" }).optional()
});