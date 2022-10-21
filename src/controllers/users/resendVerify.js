const { User } = require("../../models/users");
const { BadRequest } = require("http-errors");

const { sendEmail, createVerifyEmail } = require("../../services")

const resendVerify = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw new BadRequest(400, "Email not found")
    }

    const mail = createVerifyEmail(email, user.verificationToken);
    await sendEmail(mail);

    res.status(200).json({
        message: "Verify email resend"
    })
}

module.exports = resendVerify;