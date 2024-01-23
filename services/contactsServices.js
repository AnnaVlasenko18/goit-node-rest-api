
const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "../db/contacts.json");

async function listContacts() {
  const allContacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(allContacts);
}

async function getContactById(id) {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === id);
  return result || null;
}

async function addContact(name, email, phone) {
  const contact = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contact.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
  return newContact;
}

async function updateById(id, body) {
  const contact = await listContacts();
  const index = contact.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  contact[index] = { ...contact[index], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
  return contact[index];
}

async function removeContact(contactId) {
  const contact = await listContacts();
  const index = contact.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [removedContact] = contact.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contact, null, 2));
  return removedContact;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateById,
  removeContact,
};