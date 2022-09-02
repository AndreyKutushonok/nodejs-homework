const express = require("express");
const router = express.Router();

const controller = require("../../controllers/auth");

const { validationBody, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/user");

const { controllerWrapper } = require("../../helpers");

router.post(
  "/signup",
  validationBody(schemas.signupSchema),
  controllerWrapper(controller.signup)
);
router.post(
  "/login",
  validationBody(schemas.loginSchema),
  controllerWrapper(controller.login)
);

router.get("/logout", authenticate, controllerWrapper(controller.logout));

router.get("/current", authenticate, controllerWrapper(controller.getCurrent));

module.exports = router;
