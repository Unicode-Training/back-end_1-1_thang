import { NextFunction, Request, Response } from "express";
import { userService } from "../services/user.service";

export const userController = {
  index: async (req: any, res: Response, next: NextFunction) => {
    //Gọi service
    const users = await userService.findAll();
    res.json({
      data: users,
    });
  },
  find: async (req: Request, res: Response, next: NextFunction) => {
    // next("ABC");
    const { id } = req.params;
    const user = await userService.find(+id!); //Promise reject
    return res.json({
      data: user,
    });
  },
  create: (req: Request, res: Response) => {
    console.log(req.body);
    res.json({});
  },
};

//Controller Name --> Action
