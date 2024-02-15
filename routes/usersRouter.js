const express = require("express");
const usersRouter = express.Router();

const {
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
  verifyEmail,
} = require("../controllers/userControllers.js");
const { authenticate } = require("../helpers/authenticate");
const { upload } = require("../helpers/upload");
const { sizeChange } = require("../helpers/sizeChange");
const { isFileExits } = require("../helpers/isFileExist");

usersRouter.post("/register", register);
usersRouter.get("/verify/:verificationToken", verifyEmail);
usersRouter.post("/login", login);
usersRouter.get("/current", authenticate, getCurrent);
usersRouter.post("/logout", authenticate, logout);
usersRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  isFileExits,
  sizeChange,
  updateAvatar
);

module.exports = usersRouter;
