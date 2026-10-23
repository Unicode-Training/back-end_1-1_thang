import multer from "multer";
import crypto from "crypto";
import path from "path";
const storageLogo = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + '/storage/logo');
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

export const uploadLogo = multer({
    storage: storageLogo, limits: {
        fileSize: 1024 * 1024 * 5 //5MB
    }
});