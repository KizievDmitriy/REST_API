const { Schema, model } = require('mongoose');
const Joi = require("joi");


const passwordRegexp = /^[a-zA-Z0-9]{3,30}$/;
const emailRegexp = /^.+@.+$/;


const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6,
    },
     email: {
        type: String,
        required: [true, 'Email is required'],
        match: emailRegexp,
        unique: true,
    },
    // subscription: {
    //     type: String,
    //     enum: ["starter", "pro", "business"],
    //     default: "starter"
    // },
    // token: {
    //     type: String,
    //     default: null,
    // },
    // owner: {
    //     type: SchemaTypes.ObjectId,
    //     ref: 'user',
    // },

}, { versionKey: false, timestamps: true });

const joiSchema = Joi.object({
  password: Joi.string().min(6).pattern(passwordRegexp).trim().required(),
  email: Joi.string().email().trim().pattern(emailRegexp).required(),
});

const User = model("user", userSchema);

module.exports = {
    User,
    joiSchema,
}