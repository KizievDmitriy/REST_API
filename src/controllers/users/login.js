const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const { Unauthorized } = require("http-errors");
const { User } = require('../../models/users');

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
    throw new Unauthorized("Email  is wrong");
    };
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw new Unauthorized("Password is wrong");
    }
    const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "2h" });
    await User.findByIdAndUpdate(user._id, { token });
    res.status(200).json({
        token,
        user: {
        email,
        subscription: user.subscription,
      },
    })
};

module.exports = login;