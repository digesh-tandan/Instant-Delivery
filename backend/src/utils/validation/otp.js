const { body } = require("express-validator");

// Build Validator

const build = (

    field,

    chain

) => ({

    field,

    chain

});

// OTP

const otpField = (

    field = "otp",

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

        .isLength({

            min: 6,

            max: 6

        })

        .withMessage(

            "OTP must be 6 digits."

        )

        .isNumeric()

        .withMessage(

            "OTP must contain only numbers."

        );

    return build(

        field,

        validator

    );

};

module.exports = {

    otpField

};