const express = require("express");

const { ctrlWrapper, validation, auth} = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const { schemas } = require('../../models/users');

const router = express.Router();

router.post("/signup", validation(schemas.signupSchemas), ctrlWrapper(ctrl.signup));

router.post("/login", validation(schemas.signupSchemas), ctrlWrapper(ctrl.login));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));





module.exports = router;