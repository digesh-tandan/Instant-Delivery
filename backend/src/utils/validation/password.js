const { body } = require("express-validator");

// Build Validator

const build = (

    field,

    chain

) => ({

    field,

    chain

});

// Password

const passwordField = (

    field = "password",

    required = true

) => {

    let validator = body(field);

    if (required) {

        validator = validator

            .exists({

                checkFalsy: true

            })

            .withMessage(

                `${field.replace(/_/g, " ")} is required.`

            );

    }

    else {

        validator = validator.optional();

    }

    validator = validator

        .bail()

        .isStrongPassword({

            minLength: 8,

            minLowercase: 1,

            minUppercase: 1,

            minNumbers: 1,

            minSymbols: 1

        })

        .withMessage(

            "Password must contain uppercase, lowercase, number, special character and be at least 8 characters long."

        );

    return build(

        field,

        validator

    );

};

module.exports = {

    passwordField

};