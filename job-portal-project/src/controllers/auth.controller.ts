import { Request, Response } from "express";
import { authService } from "../services/auth.service";

export const authController = {
    async login(req: Request, res: Response) {
        const data = await authService.login(req.body);
        return res.json({
            data,
            message: "Login success",
            success: true
        })
    },
    async register(req: Request, res: Response) {
        const data = await authService.register(req.body);
        return res.status(201).json({
            data,
            message: "Register success",
            success: true
        })
    },
    async profile(req: Request, res: Response) {
        return res.json({
            data: req.user,
            message: "Get profile success",
            success: true
        })
    }
}