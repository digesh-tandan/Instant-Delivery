const {

    emailField,

    passwordField

} = require("../../utils/validation");

module.exports = [

    emailField("email", true),

    passwordField("password", true)

];