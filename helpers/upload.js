const multer = require("multer");
const path = require("path");

const tempDir = path.json(_dirname, "../", "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

// multer.express =
