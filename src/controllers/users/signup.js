const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require("uuid");
const { Conflict } = require("http-errors");
const gravatar = require('gravatar');
const { User } = require('../../models/users');
const { sendEmail, createVerifyEmail } = require("../../services")

const signup = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`${email} in use`);
  }
  const verificationToken = uuidv4();
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const result = await User.create({ email, password: hashPassword, subscription, avatarURL, verificationToken });
  const mail = createVerifyEmail(email, verificationToken)

  await sendEmail(mail);
  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
      avatarURL: result.avatarURL,
      verificationToken: result.verificationToken,
    },
  });
}

module.exports = signup;