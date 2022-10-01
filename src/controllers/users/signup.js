const { Conflict } = require("http-errors");
const { User } = require('../../models/users');

const signup = async (req, res) => {
const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`${email} in use`);
    }
    const result = User.create({ email, password });
    res.status(201).json({
        data: {
            user: {
                email: result.email,
                subscription: result.subscription,
            },
        },
    });
}

module.exports = signup;