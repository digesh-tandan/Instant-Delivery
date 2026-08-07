module.exports = {
    registerValidation: require("./register.validation"),
    loginValidation: require("./login.validation"),
    verifyOtpValidation: require("./verifyOtp.validation"),
    resendOtpValidation: require("./resendOtp.validation"),
    forgotPasswordValidation: require("./forgotPassword.validation"),
    resetPasswordValidation: require("./resetPassword.validation"),
    restoreAccountValidation:require("./restoreAccount.validation"),
    verifyRestoreAccountValidation:require("./verifyRestoreAccount.validation")
};