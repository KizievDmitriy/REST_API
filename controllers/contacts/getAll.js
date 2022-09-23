const contacts = require("../../models/contacts");

const getAll = async (req, res) => {
    
        const listContacts = await contacts.listContacts();
        res.status(200).json(listContacts);
    
};

module.exports = getAll;
