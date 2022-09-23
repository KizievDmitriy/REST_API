const contacts = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const getById = async (req, res) => {
   
        const { contactId } = req.params;
        const contactById = await contacts.getContactById(contactId);
        if (!contactById) {
            throw RequestError(404, "Not found")
        }
        res.status(200).json(contactById);
    
};

module.exports = getById;