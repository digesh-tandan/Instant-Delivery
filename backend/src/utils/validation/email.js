const { body } = require("express-validator");

// Build Validator

const build = (field, chain) => ({

    field,

    chain

});

// Email

const emailField = (options = {}) => {

    let validator = body("email");

    if (options.required) {

        validator = validator
            .exists({
                checkFalsy: true
            })
            .withMessage("Email is required.");

    } else {

        validator = validator.optional();

    }

    validator = validator
        .bail()
        .trim()
        .isEmail()
        .withMessage("Invalid email address.")

    return build(
        "email",
        validator
    );

};

module.exports = {

    emailField

};