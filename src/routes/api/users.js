const express = require("express");

const { ctrlWrapper, validation} = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const { registerSchemas } = require('../../models/users');

const router = express.Router();

router.post("/signup", validation(registerSchemas), ctrlWrapper(ctrl.signup));

module.exports = router;