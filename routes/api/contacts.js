const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts")

const {
  addContactValidation,
} = require("../../schemas/validationMidleware");

const ctrlWrapper = require('../../helpers/ctrlWrapper')

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getById));

router.post("/", addContactValidation, ctrlWrapper(ctrl.add));

router.delete("/:contactId", ctrlWrapper(ctrl.deleteById));

router.put("/:contactId", addContactValidation, ctrlWrapper(ctrl.updateById));

module.exports = router;