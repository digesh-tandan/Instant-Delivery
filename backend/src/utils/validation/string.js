const { body } = require("express-validator");

// Build Validator Object

const build = (

    field,

    chain

) => ({

    field,

    chain

});

// Required String

const requiredString = (

    field,

    options = {}

) => {

    return build(

        field,

        body(field)

            .exists({

                checkFalsy: true

            })

            .withMessage(

                `${field.replace(/_/g, " ")} is required.`

            )

            .bail()

            .trim()

            .isLength({

                min: options.min || 1,

                max: options.max || 255

            })

            .withMessage(

                `${field.replace(/_/g, " ")} must be between ${options.min || 1} and ${options.max || 255} characters.`

            )

    );

};

// Optional String

const optionalString = (

    field,

    options = {}

) => {

    return build(

        field,

        body(field)

            .optional()

            .trim()

            .isLength({

                min: options.min || 1,

                max: options.max || 255

            })

            .withMessage(

                `${field.replace(/_/g, " ")} must be between ${options.min || 1} and ${options.max || 255} characters.`

            )

    );

};

module.exports = {

    requiredString,

    optionalString

};