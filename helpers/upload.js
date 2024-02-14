const multer = require("multer");
const path = require("path");
const Jimp = require("jimp");

const tmpDir = path.join(__dirname, "../", "tmp");

const multerConfig = multer.diskStorage({
  destination: tmpDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const upload = multer({
  storage: multerConfig,
  limits,
});

module.exports = { upload };
