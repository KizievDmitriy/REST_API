const { User } = require("../../models/users");
const { NotFound, BadRequest } = require("http-errors");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  if (!req.body) {
    throw new BadRequest("Missing field subscription");
  }

  const result = await User.findByIdAndUpdate(
    _id,
    { subscription },
    { new: true }
  );
  if (!result) {
    throw new NotFound("User not found");
  }
  res.status(200).json({
    data: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = updateSubscription;