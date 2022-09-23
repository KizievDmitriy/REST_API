const contacts = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const add = async (req, res) => {

        const listContacts = await contacts.listContacts();
        const addNewContact = await contacts.addContact(req.body);
        if (listContacts.find((el) => el.email === req.body.email)) {
            throw RequestError(409, "Conflict/Contact with this email was created before");
        }
        if (!req.body.name || !req.body.email || !req.body.phone) {
            throw RequestError(400, "Missing required field");
        }
        res.status(201).json(addNewContact);
};

module.exports = add;