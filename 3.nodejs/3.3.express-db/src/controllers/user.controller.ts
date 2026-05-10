import { NextFunction, Request, Response } from "express";
import { userService } from "../services/user.service";

export const userController = {
  async index(req: Request, res: Response) {
    const { q } = req.query;
    const users = await userService.findAll(q as string);
    return res.json({
      data: users,
      success: true,
    });
  },
  async find(req: Request, res: Response) {
    const { id } = req.params;
    const user = await userService.find(id as string);
    return res.json({
      success: true,
      data: user,
    });
  },
  async create(req: Request, res: Response) {
    const body = req.body;
    const user = await userService.create(body);
    return res.status(201).json({
      success: true,
      data: user,
    });
  },
  async update(req: Request, res: Response) {
    const body = req.body;
    const { id } = req.params;
    const user = await userService.update(body, id as unknown as number);
    res.json({
      success: true,
      data: user,
    });
  },
  async delete(req: Request, res: Response) {},
};

//Controller Name --> Action
