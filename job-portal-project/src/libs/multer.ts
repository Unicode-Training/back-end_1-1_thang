import multer from "multer";
import crypto from "crypto";
import path from "path";
import fs from "fs/promises";
const fileExisting = async (path: string) => {
    try {
        await fs.access(path);
        return true;
    } catch {
        return false;
    }
}
const storageLogo = multer.diskStorage({
    destination: async function (req, file, cb) {
        const storagePath = process.cwd() + '/storage/logo';
        if (!(await fileExisting(storagePath))) {
            await fs.mkdir(storagePath);
        }
        cb(null, storagePath);
    },
    filename: function (req, file, callback) {
        crypto.randomBytes(16, function (err, raw) {
            if (err) {
                return callback(err, "");
            }
            const allowed = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
            const mimeType = file.mimetype;
            if (!allowed.includes(mimeType)) {
                return callback(new Error("Only allow png, jpg, jpeg, webp"), "");
            }
            const ext = path.extname(file.originalname);
            callback(null, 'logo' + '-' + raw.toString('hex') + ext);
        });
    },
});

const sotrageCv = multer.diskStorage({
    destination: async function (req, file, cb) {
        const storagePath = process.cwd() + '/storage/cv';
        if (!(await fileExisting(storagePath))) {
            await fs.mkdir(storagePath);
        }
        cb(null, storagePath);
    },
    filename: function (req, file, callback) {
        crypto.randomBytes(16, function (err, raw) {
            if (err) {
                return callback(err, "");
            }
            const allowed = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
            const mimeType = file.mimetype;
            if (!allowed.includes(mimeType)) {
                return callback(new Error("Only allow pdf, doc, docx"), "");
            }
            const ext = path.extname(file.originalname);
            callback(null, 'cv' + '-' + raw.toString('hex') + ext);
        });
    },
});

export const uploadLogo = multer({
    storage: storageLogo, limits: {
        fileSize: 1024 * 1024 * 5 //5MB
    }
});

export const uploadCv = multer({
    storage: sotrageCv, limits: {
        fileSize: 1024 * 1024 * 5 //10MB
    }
});