import { NextFunction, Request, Response } from "express";
import { ZodError, ZodType } from "zod";

export const validate = (zodSchema: ZodType) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const body = await zodSchema.parseAsync(req.body);
            req.body = body;
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    success: false,
                    message: "Validate failed",
                    error: Object.fromEntries(
                        error.issues.map(({ path, message }) => {
                            return [path[0], message];
                        }),
                    )
                })
            }

            //Fallback
            throw new Error("Server Error when validate");
        }

    }
}