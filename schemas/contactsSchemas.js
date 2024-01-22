const Joi = require("joi");

const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string()
    .pattern(/\d/)
    .messages({
      "string.pattern.base": "Phone must only contain digits",
    })
    .min(1)
    .required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string().pattern(/\d/).messages({
    "string.pattern.base": "Phone must only contain digits",
  }),
});

module.exports = { createContactSchema, updateContactSchema };
