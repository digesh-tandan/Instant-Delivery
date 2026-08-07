const { body } = require("express-validator");

const build = (field, chain) => ({
    field,
    chain
});

// OTP

const otpField = (required = true) => {

    let validator = body("otp");

    if (required) {

        validator = validator
            .exists({ checkFalsy: true })
            .withMessage("OTP is required.");

    } else {

        validator = validator.optional();

    }

    validator = validator
        .isLength({ min: 6, max: 6 })
        .withMessage("OTP must be exactly 6 digits.")
        .isNumeric()
        .withMessage("OTP must contain only numbers.");

    return build("otp", validator);

};

// Token

const tokenField = (

    field,

    required = true

) => {

    let validator = body(field);

    if (required) {

        validator = validator
            .exists({ checkFalsy: true })
            .withMessage(`${field.replace(/_/g, " ")} is required.`);

    } else {

        validator = validator.optional();

    }

    validator = validator
        .trim()
        .isString()
        .withMessage(`${field.replace(/_/g, " ")} is invalid.`);

    return build(field, validator);

};

module.exports = {

    otpField,

    tokenField

};