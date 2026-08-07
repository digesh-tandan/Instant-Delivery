const {

    emailField,

    otpField,

    passwordField

} = require("../../utils/validation");

module.exports = [

    emailField("email", true),

    otpField("otp", true),

    passwordField("new_password", true)

];