const statusCodes = require("../constants/statusCodes");

const ERROR_CODES = require("../constants/errorCodes");

const AppError = require("../utils/AppError");

const {

    errorResponse

} = require("../helpers/response.helper");

module.exports = (

    err,

    req,

    res,

    next

) => {

    console.error(err);

    // Custom Application Errors

    if (err instanceof AppError) {

        return errorResponse(

            res,

            err.statusCode,

            err.message,

            err.errors,

            err.errorCode

        );

    }

    // JWT Errors

    if (

        err.name === "JsonWebTokenError"

    ) {

        return errorResponse(

            res,

            statusCodes.UNAUTHORIZED,

            "Invalid access token.",

            [],

            ERROR_CODES.INVALID_ACCESS_TOKEN

        );

    }

    if (

        err.name === "TokenExpiredError"

    ) {

        return errorResponse(

            res,

            statusCodes.UNAUTHORIZED,

            "Access token expired.",

            [],

            ERROR_CODES.ACCESS_TOKEN_EXPIRED

        );

    }

    // MySQL Duplicate Entry

    if (

        err.code === "ER_DUP_ENTRY"

    ) {

        return errorResponse(

            res,

            statusCodes.CONFLICT,

            "Duplicate entry found.",

            [],

            ERROR_CODES.DUPLICATE_ENTRY

        );

    }

    // MySQL Foreign Key

    if (

        err.code === "ER_NO_REFERENCED_ROW_2"

    ) {

        return errorResponse(

            res,

            statusCodes.BAD_REQUEST,

            "Referenced record does not exist.",

            [],

            ERROR_CODES.FOREIGN_KEY_ERROR

        );

    }

    // Default Error

    return errorResponse(

        res,

        err.statusCode ||

        statusCodes.INTERNAL_SERVER_ERROR,

        err.message ||

        "Internal server error.",

        [],

        ERROR_CODES.INTERNAL_SERVER_ERROR

    );

};