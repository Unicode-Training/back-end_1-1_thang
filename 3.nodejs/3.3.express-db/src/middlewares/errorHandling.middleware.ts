import { NextFunction, Request, Response } from "express";

//404
export const notFoundHandling = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(404).json({
    error: "Not Found",
  });
};

//Error handling
export const errorHandling = (
  error: Error & { status?: number; errors: { [key: string]: string } },
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return res.status(error.status || 500).json({
    message: error.message,
    errors: error.errors,
  });
};
