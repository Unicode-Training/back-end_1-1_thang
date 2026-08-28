import { Request, Response } from "express";
import { authService } from "../services/auth.service";

export const authController = {
    async login(req: Request, res: Response) {
        const data = await authService.login(req.body);
        return res.json({
            data,
            success: true,
            message: "Login success"
        })
    },
    async register(req: Request, res: Response) {
        const data = await authService.register(req.body);
        return res.json({
            data,
            success: true,
            message: "Register success"
        })
    },

    async profile(req: Request, res: Response) {
        const data = req.user;
        return res.json({
            message: "Get profile success",
            success: true,
            data
        })
    },

    async logout(req: Request, res: Response) {
        authService.logout(req.jti!, req.expired!);
        return res.json({
            success: true,
            message: "Logout success"
        })
    }
}