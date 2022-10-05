const express = require("express");

const { ctrlWrapper, validation} = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const { schemas } = require('../../models/users');

const router = express.Router();

router.post("/signup", validation(schemas.signupSchemas), ctrlWrapper(ctrl.signup));

module.exports = router;