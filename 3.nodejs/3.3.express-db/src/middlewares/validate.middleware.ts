import { NextFunction, Request, Response } from "express";
import { ZodError, ZodType } from "zod";
import { HttpException } from "../exceptions/http.exception";

export const validate =
  (schema: ZodType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = await schema.parseAsync(req.body ?? {});
      req.body = body;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errors = Object.fromEntries(
          error.issues.map(({ path, message }) => {
            return [path[0], message];
          }),
        );
        throw new HttpException("Validate failed", 400, errors);
      }
    }
  };
