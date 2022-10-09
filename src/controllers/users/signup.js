const bcrypt = require('bcryptjs');
const { Conflict } = require("http-errors");
const gravatar = require('gravatar');
const { User } = require('../../models/users');

const signup = async (req, res) => {
const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`${email} in use`);
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
    const result = await User.create({ email, password: hashPassword, subscription, avatarURL});
  res.status(201).json({
        user: {
          email: result.email,
          subscription: result.subscription,
          avatarURL: result.avatarURL,
        },
    });
}

module.exports = signup;