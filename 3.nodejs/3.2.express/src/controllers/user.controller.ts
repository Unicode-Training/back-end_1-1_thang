import { NextFunction, Request, Response } from "express";

export const userController = {
  index: (req: any, res: Response, next: NextFunction) => {
    const { s, status } = req.query;
    // const apiKey = req.get("x-api-key");
    // const apiKey = req.headers["x-api-key"];
    // console.log(apiKey);
    // res.set("x-api-key", "123");
    // res.status(404);
    console.log(req.user);

    res.json({ s, status });
  },
  find: (req: Request, res: Response) => {
    const { id } = req.params;
    res.json({ id });
  },
  create: (req: Request, res: Response) => {
    console.log(req.body);

    res.json({});
  },
};
