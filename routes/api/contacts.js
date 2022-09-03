const express = require("express");

const controller = require("../../controllers/contacts");

const { controllerWrapper } = require("../../helpers");

const {
  authenticate,
  validationBody,
  isValidId,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", authenticate, controllerWrapper(controller.getAll));

router.get("/:contactId", isValidId, controllerWrapper(controller.getById));

router.post(
  "/",
  authenticate,
  validationBody(schemas.addSchema),
  controllerWrapper(controller.add)
);

router.delete(
  "/:contactId",
  isValidId,
  controllerWrapper(controller.removeById)
);

router.put(
  "/:contactId",
  isValidId,
  validationBody(schemas.addSchema),
  controllerWrapper(controller.updateById)
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validationBody(schemas.updateFavoriteSchema),
  controllerWrapper(controller.updateFavorite)
);

module.exports = router;
