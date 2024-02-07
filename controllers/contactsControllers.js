const {
  Contact,
  updateStatusContact,
} = require("../services/contactsServices.js");

const HttpError = require("../helpers/HttpError.js");

const {
  createContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} = require("../schemas/contactsSchemas.js");

const getAllContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 10, favorite } = req.query;
    const skip = (page - 1) * limit;

    const favoriteFilter = { owner };
    if (favorite) {
      favoriteFilter.favorite = favorite;
    }

    const result = await Contact.find(favoriteFilter, "-createdAt -updatedAt", {
      skip,
      limit,
    }).populate("owner", "email");
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id);
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
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const { error } = createContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });
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
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateStatusFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!req.body.hasOwnProperty("favorite")) {
      throw HttpError(400, "missing field favorite");
    }

    const { error } = updateFavoriteSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await updateStatusContact(id, req.body);

    if (!result) {
      throw HttpError(404);
    }

    res.status(200).json(result);
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
  updateStatusFavorite,
};
