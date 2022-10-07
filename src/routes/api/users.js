const express = require("express");

const { ctrlWrapper, validation, auth, upload} = require("../../middlewares");
const { users: ctrl } = require("../../controllers");
const { schemas } = require('../../models/users');

const router = express.Router();

router.post("/signup", validation(schemas.signupSchemas), ctrlWrapper(ctrl.signup));

router.post("/login", validation(schemas.signupSchemas), ctrlWrapper(ctrl.login));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

router.patch("/:id/subscription", auth, validation(schemas.subscriptionSchema), ctrlWrapper(ctrl.updateSubscription));

router.patch("/avatars", auth, upload.single('avatar'), ctrlWrapper(ctrl.updateAvatar));





module.exports = router;