// Libs
const sgMail = require('@sendgrid/mail');
// Environment variables
const { SENDGRID_API_KEY, SENDGRID_SENDER_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async email => {
    return sgMail.send({ ...email, from: SENDGRID_SENDER_EMAIL });
};

module.exports = sendEmail;
