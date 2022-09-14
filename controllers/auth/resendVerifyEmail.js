const { User } = require("../../models/user");
const { RequestError, sendEmail } = require("../../helpers");

const { LOCALHOST } = process.env;

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(400, "missing required field email");
  }
  if (user.verify) {
    throw RequestError(400, "Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Підтвердження регістрації на сайті",
    html: `<a href ="${LOCALHOST}/api/users/verify/${user.verificationToken}" target="_blank">Натисніть для підтвердження email</a>`,
  };
  await sendEmail(mail);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
