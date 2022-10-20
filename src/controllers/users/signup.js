const bcrypt = require('bcryptjs');
const sgMail = require("@sendgrid/mail");
const { v4: uuidv4 } = require("uuid");
const { Conflict } = require("http-errors");
const gravatar = require('gravatar');
const { User } = require('../../models/users');

// const { MAIL_FROM } = process.env
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
  const msg = {
    to: email,
    from: "dmitrii_test@meta.ua",
    subject: "Thank you for registration!",
    text: `Please, confirm your email address GET http://localhost:3000/api/users/verify/${verificationToken}`,
    html: `Please, confirm your email address GET http://localhost:3000/api/users/verify/${verificationToken}`,
  };
  sgMail.send(msg);
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