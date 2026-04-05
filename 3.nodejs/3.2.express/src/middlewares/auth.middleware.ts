import { NextFunction, Request, Response } from "express";

export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  console.log(`Auth Middleware`);
  req.user = "Hoàng An";
  next();
};
