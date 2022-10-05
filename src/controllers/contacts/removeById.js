const { Contact } = require("../../models/contacts");
const { NotFound } = require("http-errors");

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.status(200).json({
    message: "Contact deleted",
    data: {
      result,
    },
  });
};

module.exports = removeById;
