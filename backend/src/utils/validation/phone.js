const { body } = require("express-validator");

// Build Validator

const build = (

    field,

    chain

) => ({

    field,

    chain

});

// Phone

const phoneField = (

    field = "phone",

    options = {}

) => {

    // Backward compatibility:
    // phoneField({ required: false })

    if (

        typeof field === "object"

    ) {

        options = field;

        field = "phone";

    }

    let validator = body(field);

    if (options.required) {

        validator = validator

            .exists({

                checkFalsy: true

            })

            .withMessage(

                `${field.replace(/_/g, " ")} is required.`

            );

    } else {

        validator = validator.optional();

    }

    validator = validator

        .bail()

        .trim()

        .isMobilePhone("en-IN")

        .withMessage(

            `Invalid ${field.replace(/_/g, " ")}.`

        );

    return build(

        field,

        validator

    );

};

module.exports = {

    phoneField

};