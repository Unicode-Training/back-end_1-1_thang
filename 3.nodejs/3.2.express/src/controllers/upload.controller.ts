import { Request, Response } from "express";

export const uploadController = {
  upload: (req: Request, res: Response) => {
    res.json({
      image: req.file,
    });
  },
};
