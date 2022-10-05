const { Conflict } = require("http-errors");
const { User } = require('../../models/users');

const signup = async (req, res) => {
const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`${email} in use`);
    }
    const result = await User.create({ email, password, subscription});
  res.status(201).json({
        user: {
          email: result.email,
          password: result.password,
          subscription: result.subscription,
        },
    });
}

module.exports = signup;