const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
dotenv.config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const { TEST_EMAIL } = process.env;

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: TEST_EMAIL };
    await sgMail.send(email);
    return true;
  } catch (error) {}
};

module.exports = sendEmail;
