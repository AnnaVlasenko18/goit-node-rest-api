const express = require("express");
const usersRouter = express.Router();
const {
  register,
  login,
  getCurrent,
  logout,
} = require("../controllers/userControllers.js");
const { authenticate } = require("../helpers/authenticate");

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.get("/current", authenticate, getCurrent);
usersRouter.post("/logout", authenticate, logout);

module.exports = usersRouter;
