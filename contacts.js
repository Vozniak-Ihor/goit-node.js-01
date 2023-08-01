const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "/db/contacts.json");
console.log(contactsPath, "contactsPath");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = await JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((item) => item.id === contactId);
  return contact || null;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContacts = { id: nanoid(), name, email, phone };
  contacts.push(newContacts);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContacts;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
