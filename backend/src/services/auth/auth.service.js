const register = require("./register.service");
const verifyOTP = require("./verifyOtp.service");
const resendOTP = require("./resendOtp.service");
const login = require("./login.service");
const logout = require("./logout.service");
const refreshToken = require("./refreshToken.service");
const forgotPassword = require("./forgotPassword.service");
const resetPassword = require("./resetPassword.service");
const restoreAccount = require("./restoreAccount.service");
const verifyRestoreAccount = require("./verifyRestoreAccount.service");

module.exports = {

    register,

    verifyOTP,

    resendOTP,

    login,

    logout,

    refreshToken,

    forgotPassword,

    resetPassword,

    restoreAccount,

    verifyRestoreAccount
};