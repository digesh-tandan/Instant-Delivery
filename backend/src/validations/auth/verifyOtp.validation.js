const {

    emailField,

    otpField

} = require("../../utils/validation");

module.exports = [

    emailField("email", true),

    otpField("otp", true)

];