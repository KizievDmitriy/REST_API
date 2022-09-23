const contacts = require("../../models/contacts");
const { RequestError } = require("../../helpers");

const deleteById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contactById = await contacts.getContactById(contactId);

        if (!contactById) {
            throw RequestError(404, "Not found");
        } else {
            await contacts.removeContact(contactId);
            return res.status(204).json({ message: "contact deleted" });
        }
    } catch (error) {
        next(error);
    }
};

module.exports = deleteById;