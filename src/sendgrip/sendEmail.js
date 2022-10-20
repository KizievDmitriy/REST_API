const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY, MAIL_FROM } = process.env;


sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
    const mail = { ...data, from: `${MAIL_FROM}` };
    await sgMail.send(mail);
    return true;
}

module.exports = sendEmail;