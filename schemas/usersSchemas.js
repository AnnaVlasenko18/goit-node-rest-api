const Joi = require("joi");
const { join } = require("path");

const subscriptionList = ["starter", "pro", "business"];

const registerScherma = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(4).required(),
});

const emailSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
});

const loginScherma = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  password: Joi.string().min(4).required(),
});

const subscriptionScherma = Joi.object({
  subscription: Joi.string()
    .valid(...subscriptionList)
    .required(),
});

module.exports = {
  registerScherma,
  loginScherma,
  subscriptionScherma,
  emailSchema,
};
