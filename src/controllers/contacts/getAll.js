const { Contact } = require("../../models/contacts");

const getAll = async (req, res) => {

  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  const contacts = await Contact.find(
    favorite ? { owner, favorite } : { owner },
    " ",
    {
      skip,
      limit: Number(limit),
    }
  ).populate("owner", "_id email subscription");;
  res.status(200).json({
    data: {
      result: contacts,
    },
  });
};

module.exports = getAll;
