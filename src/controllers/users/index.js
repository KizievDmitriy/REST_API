const signup = require('./signup');
const verificationToken = require('./verificationToken');
const resendVerify = require("./resendVerify");
const login = require('./login');
const getCurrent = require('./getCurrent');
const logout = require('./logout');
const updateSubscription = require('./updateSubscription');
const updateAvatar = require('./updateAvatar');

module.exports = {
    signup,
    verificationToken,
    login,
    getCurrent,
    logout,
    updateSubscription,
    updateAvatar,
    resendVerify
}