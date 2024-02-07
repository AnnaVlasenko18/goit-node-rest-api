const express = require("express");

const { isValidId } = require("../helpers/isValidate");

const { authenticate } = require("../helpers/authenticate");
const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusFavorite,
} = require("../controllers/contactsControllers");

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, getAllContacts);
contactsRouter.get("/:id", authenticate, isValidId, getOneContact);
contactsRouter.delete("/:id", authenticate, isValidId, deleteContact);
contactsRouter.post("/", authenticate, createContact);
contactsRouter.put("/:id", authenticate, isValidId, updateContact);
contactsRouter.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  updateStatusFavorite
);

module.exports = contactsRouter;
