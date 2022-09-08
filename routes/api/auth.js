const express = require("express");
const router = express.Router();

const controller = require("../../controllers/auth");

const { validationBody, authenticate, upload } = require("../../middlewares");
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

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  controllerWrapper(controller.updateAvatar)
);

router.get("/logout", authenticate, controllerWrapper(controller.logout));

router.get("/current", authenticate, controllerWrapper(controller.getCurrent));

module.exports = router;
