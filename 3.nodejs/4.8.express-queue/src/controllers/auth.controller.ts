import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { deviceService } from "../services/device.service";

export const authController = {
    async login(req: Request, res: Response) {
        const data = await authService.login(req.body, req);
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
    },

    async refreshToken(req: Request, res: Response) {
        const { refreshToken } = req.body;
        const data = await authService.refreshToken(refreshToken);
        return res.json({
            data,
            message: "Refresh token success",
            success: true,
        });
    },

    async devices(req: Request, res: Response) {
        const userId = req.user?.id;
        const data = await deviceService.findAll(userId!);
        return res.json({
            data,
            message: "Get devices list success",
            success: true,
        });
    },

    async logoutDevice(req: Request, res: Response) {
        const userId = req.user?.id;
        const { id } = req.params;
        const data = await deviceService.logoutById(+id!, userId!);
        return res.json({
            data,
            message: "Get devices list success",
            success: true,
        });
    },

    async logoutAllDevice(req: Request, res: Response) {
        const userId = req.user?.id;
        const jti = req.jti;
        await deviceService.logoutAllDevice(userId!, jti!)
        return res.json({
            message: "Login all device success",
            success: true
        });
    },

    async active(req: Request, res: Response) {
        const { otp, loginUrl } = req.body;
        const origin = req.headers.origin;
        const loginUrlFull = `${origin}${loginUrl}`
        await authService.activeUser(otp, loginUrlFull);
        return res.json({
            message: "Active account success",
            success: true
        })
    }

}