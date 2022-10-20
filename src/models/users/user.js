const { Schema, model } = require('mongoose');
const Joi = require("joi");
const bcrypt = require('bcryptjs');



const passwordRegexp = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;
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
  avatarURL: {
    type: String,
    required: [true, 'Avatar is required'],
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  }
}, { versionKey: false, timestamps: true });

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

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