const bcrypt = require('bcryptjs');
const { Unauthorized } = require("http-errors");
const { User } = require('../../models/users');


const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
    throw new Unauthorized("Email  is wrong");
    };
    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
        throw new Unauthorized(" password is wrong");
    }
    const token = "23hjgjhgjh.hkbkggfd.iglghgui";
    res.status(200).json({
        token,
        user: {
        email,
        subscription: user.subscription,
      },
    })
};

module.exports = login;