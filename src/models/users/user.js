const { Schema, model } = require('mongoose');
const Joi = require("joi");

const { handleValidationErrors } = require("../../middlewares");


const passwordRegexp = /^[a-zA-Z0-9]{3,30}$/;
const emailRegexp = /^.+@.+$/;


const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
        match: passwordRegexp,
    },
     email: {
        type: String,
        required: [true, 'Email is required'],
        match: emailRegexp,
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    },
}, { versionKey: false, timestamps: true });

userSchema.post("save", handleValidationErrors);

const subscriptionSchemas = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const signupSchemas = Joi.object({
  password: Joi.string().min(6).pattern(passwordRegexp).trim().required(),
  email: Joi.string().pattern(emailRegexp).trim().required(),
});

const schemas = {
  signupSchemas,
  subscriptionSchemas,
};

const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
}