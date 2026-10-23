import fs from "fs/promises";
export const uploadService = {
    async deleteFile(path: string) {
        await fs.unlink(path);
    }
}