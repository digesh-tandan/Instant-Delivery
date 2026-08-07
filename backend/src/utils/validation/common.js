const {

    body,

    param

} = require("express-validator");

const { normalizeDate } = require("../../helpers/date.helper");

// Build Validator Object

const build = (field, chain) => ({

    field,

    chain

});

// Gender

const genderField = (options = {}) => {

    let validator = body("gender");

    if (options.required) {

        validator = validator
            .exists({
                checkFalsy: true
            })
            .withMessage("Gender is required.");

    } else {

        validator = validator.optional();

    }

    validator = validator
        .isIn([
            "Male",
            "Female",
            "Other"
        ])
        .withMessage(
            "Gender must be Male, Female or Other."
        );

    return build(
        "gender",
        validator
    );

};

// Date

const dateField = (

    field,

    options = {}

) => {

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
        .customSanitizer(normalizeDate)
        .isISO8601()
        .withMessage(
            `${field.replace(/_/g, " ")} must be a valid date.`
        );

    return build(
        field,
        validator
    );

};

// Boolean

const booleanField = (

    field,

    options = {}

) => {

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
        .isBoolean()
        .withMessage(
            `${field.replace(/_/g, " ")} must be true or false.`
        );

    return build(
        field,
        validator
    );

};

// Integer

const integerField = (

    field,

    options = {}

) => {

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
        .isInt()
        .withMessage(
            `${field.replace(/_/g, " ")} must be an integer.`
        );

    return build(
        field,
        validator
    );

};

// Decimal

const decimalField = (

    field,

    options = {}

) => {

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
        .isFloat()
        .withMessage(
            `${field.replace(/_/g, " ")} must be a decimal number.`
        );

    return build(
        field,
        validator
    );

};

// Latitude

const latitudeField = (

    field,

    options = {}

) => {

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

        .isFloat({

            min: -90,

            max: 90

        })

        .withMessage(

            `${field.replace(/_/g, " ")} must be between -90 and 90.`

        );

    return build(

        field,

        validator

    );

};

// Longitude

const longitudeField = (

    field,

    options = {}

) => {

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

        .isFloat({

            min: -180,

            max: 180

        })

        .withMessage(

            `${field.replace(/_/g, " ")} must be between -180 and 180.`

        );

    return build(

        field,

        validator

    );

};

// ID Param

const idParam = (

    field

) => {

    return build(

        field,

        param(field)

            .isInt({

                min: 1

            })

            .withMessage(

                `${field.replace(/_/g, " ")} must be a valid ID.`

            )

    );

};

// Enum

const enumField = (

    field,

    values,

    options = {}

) => {

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
        .isIn(values)
        .withMessage(
            `${field.replace(/_/g, " ")} contains an invalid value.`
        );

    return build(
        field,
        validator
    );

};

// Object

const objectField = (

    field,

    options = {}

) => {

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
        .custom(value => {

            if (

                typeof value !== "object" ||

                value === null ||

                Array.isArray(value)

            ) {

                throw new Error(

                    `${field.replace(/_/g, " ")} must be a valid object.`

                );

            }

            return true;

        });

    return build(

        field,

        validator

    );

};

module.exports = {

    genderField,

    dateField,

    booleanField,

    integerField,

    decimalField,

    latitudeField,

    longitudeField,

    idParam,

    enumField,

    objectField

};