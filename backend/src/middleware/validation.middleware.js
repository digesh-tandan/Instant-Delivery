const {

    validationResult

} = require("express-validator");

const AppError = require("../utils/AppError");

const ERROR_CODES = require("../constants/errorCodes");

const {

    getFieldSuggestion

} = require("../utils/fieldSuggestion");

// Universal Validation Middleware

const validate = (

    validators = []

) => {

    return async (

        req,

        res,

        next

    ) => {

        try {

            // Allowed Fields

            const allowedFields = validators.map(

                validator => validator.field

            );

            // Execute Validators

            for (

                const validator of validators

            ) {

                await validator.chain.run(

                    req

                );

            }

            // Unknown Fields

            const receivedFields = Object.keys(

                req.body || {}

            );

            const errors = [];

            for (

                const field of receivedFields

            ) {

                if (

                    !allowedFields.includes(

                        field

                    )

                ) {

                    const suggestion =

                        getFieldSuggestion(

                            field,

                            allowedFields

                        );

                    errors.push({

                        field,

                        message: suggestion

                            ? `Unknown field. Did you mean '${suggestion}'?`

                            : "Unknown field. This field is not allowed."

                    });

                }

            }

            // Express Validator Errors

            const result = validationResult(

                req

            );

            if (

                !result.isEmpty()

            ) {

                result.array().forEach(

                    error => {

                        errors.push({

                            field: error.path,

                            message: error.msg

                        });

                    }

                );

            }

            // Return Validation Error

            if (

                errors.length

            ) {

                return next(

                    new AppError(

                        "Validation failed.",

                        400,

                        ERROR_CODES.VALIDATION_ERROR,

                        errors

                    )

                );

            }

            next();

        }

        catch (

            error

        ) {

            next(error);

        }

    };

};

module.exports = validate;