const {

    requiredString,

    optionalString,

    emailField,

    phoneField,

    passwordField,

    genderField,

    dateField

} = require("../../utils/validation");

module.exports = [

    requiredString("first_name", { min: 2, max: 50 }),

    optionalString("last_name", { min: 2, max: 50 }),

    emailField("email", true),

    phoneField("phone", true),

    passwordField("password", true),

    genderField(),

    dateField("date_of_birth")

];