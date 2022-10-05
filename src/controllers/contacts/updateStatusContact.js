const { Contact } = require("../../models/contacts");
const { NotFound, BadRequest } = require("http-errors");

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  if (!req.body) {
    throw new BadRequest("missing field favorite");
  }
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    {
      new: true,
    }
  );
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`);
  }
  res.status(200).json({
    data: {
      result,
    },
  });
};

module.exports = updateStatusContact;
