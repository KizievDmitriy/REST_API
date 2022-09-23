const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/contacts")

const {
  addContactValidation,
} = require("../../schemas/validationMidleware");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", addContactValidation, ctrl.add);

router.delete("/:contactId", ctrl.deleteById);

router.put("/:contactId", addContactValidation, ctrl.updateById);

module.exports = router;