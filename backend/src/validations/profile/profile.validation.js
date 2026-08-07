const {

    optionalString,

    phoneField,

    genderField,

    dateField

} = require("../../utils/validation");

const profileValidation = [

    optionalString("first_name", {
        min: 2,
        max: 50
    }),

    optionalString("last_name", {
        min: 2,
        max: 50
    }),

    phoneField({
        required: false
    }),

    genderField({
        required: false
    }),

    dateField(
        "date_of_birth",
        {
            required: false
        }
    )

];

module.exports = profileValidation;