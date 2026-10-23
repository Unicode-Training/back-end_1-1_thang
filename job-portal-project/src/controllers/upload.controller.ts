import { Request, Response } from "express";
import { uploadService } from "../services/upload.service";

export const uploadController = {
    async uploadLogo(req: Request, res: Response) {
        const { replacePath } = req.body;
        if (replacePath) {
            await uploadService.deleteFile(process.cwd() + replacePath);
        }
        return res.json({
            success: true,
            message: "Upload logo success",
            data: {
                fullUrl: req.protocol + '://' + req.get('host') + '/storage/logo/' + req.file?.filename,
                path: '/storage/logo/' + req.file?.filename
            }
        })
    }
}