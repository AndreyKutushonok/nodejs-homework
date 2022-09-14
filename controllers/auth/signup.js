const { User } = require("../../models/user");
const { RequestError, sendEmail } = require("../../helpers");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const nanoid = require("nanoid");
const { LOCALHOST } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid.nanoid();
  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  const mail = {
    to: email,
    subject: "Підтвердження регістрації на сайті",
    html: `<a href ="${LOCALHOST}/api/users/verify/${verificationToken}" target="_blank">Натисніть для підтвердження email</a>`,
  };
  await sendEmail(mail);
  res.status(201).json({
    user: {
      email: result.email,
      subscription: "starter",
    },
  });
};

module.exports = signup;
