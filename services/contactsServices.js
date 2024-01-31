const { Schema, model } = require("mongoose");

const HttpError = require("../helpers/HttpError.js");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

async function updateStatusContact(id, body) {
  const updatedStatus = await Contact.findByIdAndUpdate(
    id,
    { $set: body },
    { new: true }
  );
  return updatedStatus;
}

module.exports = { Contact, updateStatusContact };
