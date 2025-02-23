const { RequestError } = require("../helpers");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { User } = require("../models/user");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(RequestError(401, "Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ token });
    if (!user || !user.token) {
      next(RequestError(401, "Not authorized"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(RequestError(401, "Not authorized"));
  }
};

module.exports = authenticate;
