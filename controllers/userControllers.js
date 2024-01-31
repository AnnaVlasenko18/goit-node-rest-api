const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  registerScherma,
  loginScherma,
  subscriptionScherma,
} = require("../schemas/usersSchemas.js");

const { User } = require("../services/usersServicer.js");

const HttpError = require("../helpers/HttpError.js");

const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  try {
    const { error } = await registerScherma.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ ...req.body, password: hashPassword });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { error } = await loginScherma.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password wrong");
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

    res.json({
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
