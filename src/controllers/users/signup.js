const bcrypt = require('bcryptjs');
const { Conflict } = require("http-errors");
const { User } = require('../../models/users');

const signup = async (req, res) => {
const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`${email} in use`);
  }
  const hashPassword = await bcrypt.hash(password, 10)
    const result = await User.create({ email, password: hashPassword, subscription});
  res.status(201).json({
        user: {
          email: result.email,
          subscription: result.subscription,
        },
    });
}

module.exports = signup;