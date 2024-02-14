const Jimp = require("jimp");
const fs = require("fs/promises");

const sizeChange = async (req, res, next) => {
  const { path: tmpUpload, originalname } = req.file;

  Jimp.read(tmpUpload)
    .then((image) => {
      return image.resize(250, 250).write(tmpUpload);
    })
    .then(() => {
      next();
    })
    .catch((error) => {
      fs.unlink(tmpUpload, originalname);
      next(error);
    });
};

module.exports = { sizeChange };
