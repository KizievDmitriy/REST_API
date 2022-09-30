const express = require("express");

const { ctrlWrapper, validation, isValidId } = require("../../middlewares");
const { signup: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", ctrlWrapper(ctrl.signup));

module.exports = router;