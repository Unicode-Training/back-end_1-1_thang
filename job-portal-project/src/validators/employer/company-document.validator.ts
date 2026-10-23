import z from "zod";

export const createCompanyDocumentSchema = z.object({
    name: z.string({ error: "Document name is required" }),
    file: z.string({ error: "Document file is required" })
});

export const updateCompanyDocumentSchema = z.object({
    name: z.string({ error: "Document name is required" }).optional(),
    file: z.string({ error: "Document file is required" }).optional()
})