import multer from "multer";
import crypto from "crypto";
import path from "path";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads");
  },
  filename: function (req, file, cb) {
    const filename = file.originalname;
    const name = crypto.randomUUID();
    const ext = path.extname(filename);
    const mimeType = file.mimetype;

    const allowed = ["image/png", "image/jpg", "image/jpeg", "image/gif"];
    if (!allowed.includes(mimeType)) {
      return cb(new Error("Định dạng không được phép"), "");
    }
    cb(null, `${name}${ext}`);
  },
});

export const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024,
  },
});
