const HttpError = require("../helpers/HttpError");

const isFileExits = (req, res, next) => {
  if (!req.file) {
    next(HttpError(400, `Must add file`));
  }
  next();
};

module.exports = { isFileExits };
