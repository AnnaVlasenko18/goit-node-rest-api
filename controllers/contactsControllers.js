const {
  listContacts,
  getContactById,
  addContact,
  updateById,
  removeContact,
} = require("../services/contactsServices.js");

const HttpError = require("../helpers/HttpError.js");

const {
  createContactSchema,
  updateContactSchema,
} = require("../schemas/contactsSchemas.js");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getContactById(id);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await removeContact(id);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const { error } = createContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await addContact(name, email, phone);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const value = Object.keys(req.body).length;
    const { error } = updateContactSchema.validate(req.body);
    if (!value) {
      throw HttpError(400, "Body must have at least one field");
    }

    if (error) {
      throw HttpError(400, error.message);
    }

    const { id } = req.params;
    const result = await updateById(id, req.body);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
};
