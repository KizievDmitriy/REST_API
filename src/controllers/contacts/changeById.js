const { Contact } = require("../../models/contacts");
const { NotFound } = require("http-errors");

const changeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.status(200).json({
    data: {
      result,
    },
  });
};

module.exports = changeById;
