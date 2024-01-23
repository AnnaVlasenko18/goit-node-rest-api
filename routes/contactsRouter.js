const express = require("express");

const { isValidId } = require("../helpers/isValidate");

const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusFavorite,
} = require("../controllers/contactsControllers");

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", isValidId, getOneContact);

contactsRouter.delete("/:id", isValidId, deleteContact);

contactsRouter.post("/", createContact);

contactsRouter.put("/:id", isValidId, updateContact);

contactsRouter.patch("/:id/favorite", isValidId, updateStatusFavorite);

module.exports = contactsRouter;
