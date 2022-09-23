const contacts = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const updateById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        if (!req.body) {
            throw RequestError(404, "Not found");
        }
        if (!contactId) {
            throw RequestError(404, "Not found");
        }
        const updateContactById = await contacts.updateContact(contactId, req.body);
        res.status(200).json(updateContactById);
    } catch (error) {
        next(error);
    }
};

module.exports = updateById;