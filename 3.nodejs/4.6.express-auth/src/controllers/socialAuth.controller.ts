import { Request, response, Response } from "express";
import { socialAuthService } from "../services/socialAuth.service";

export const socialAuthController = {
    async google(req: Request, res: Response) {
        const data = await socialAuthService.google();
        return res.redirect(data);
    },
    async googleCallback(req: Request, res: Response) {
        const { code } = req.query;
        return res.redirect(`${process.env.FRONTEND_URL}?code=${code}`);
    },
    async googleLogin(req: Request, res: Response) {
        const { code } = req.body;
        const data = await socialAuthService.googleLogin(code);
        return res.json({ data })
    }
}