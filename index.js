const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const contacts = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContact = await contacts.listContacts();
      console.log(allContact);
      break;

    case "get":
      const getId = await contacts.getContactById(id);
      console.log(getId);
      break;

    case "add":
      const add = await contacts.addContact(name, email, phone);
      console.log(add);
      break;

    case "remove":
      const remove = await contacts.removeContact(id);
      console.log(remove);
      break;
  }
};

const arr = hideBin(process.argv);
const { argv } = yargs(arr);
invokeAction(argv);
