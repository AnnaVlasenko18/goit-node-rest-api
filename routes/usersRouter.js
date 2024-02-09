const express = require("express");
const usersRouter = express.Router();

const {
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
} = require("../controllers/userControllers.js");
const { authenticate } = require("../helpers/authenticate");
const { upload } = require("../helpers/upload.js");
const { sizeChange } = require("../helpers/sizeChange.js");

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.get("/current", authenticate, getCurrent);
usersRouter.post("/logout", authenticate, logout);
usersRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatar,
  sizeChange
);

module.exports = usersRouter;
