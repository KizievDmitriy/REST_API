const { BASE_URL } = process.env;

const createVerifyEmail = (email, verificationToken) => {
    const mail = {
        to: email,
        subject: "Confirmation of registration",
        text: `To confirm your email address follow this link: ${BASE_URL}/api/users/verify/${verificationToken}`,
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click to confirm</a>`
    };

    return mail;
}

module.exports = createVerifyEmail;