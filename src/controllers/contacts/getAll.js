const { Contact } = require("../../models/contacts");

const getAll = async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json({
    data: {
      result: contacts,
    },
  });
};

module.exports = getAll;
