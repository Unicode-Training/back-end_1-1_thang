import { NextFunction, Request, Response } from "express";

export const loggingMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("logging middleware");
  //Chặn: res.json({})
  next(); //đi tiếp
};
