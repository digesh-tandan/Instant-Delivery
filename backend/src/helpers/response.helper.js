// Success Response

const successResponse = (

    res,

    statusCode = 200,

    message = "Success.",

    data = null,

    meta = null

) => {

    const response = {

        success: true,

        message

    };

    if (data !== null) {

        response.data = data;

    }

    if (meta !== null) {

        response.meta = meta;

    }

    return res

        .status(statusCode)

        .json(response);

};


// Error Response

const errorResponse = (

    res,

    statusCode = 500,

    message = "Something went wrong.",

    errors = [],

    errorCode = null

) => {

    const response = {

        success: false,

        message

    };

    if (errorCode) {

        response.error_code = errorCode;

    }

    if (

        Array.isArray(errors) &&

        errors.length

    ) {

        response.errors = errors;

    }

    return res

        .status(statusCode)

        .json(response);

};

module.exports = {

    successResponse,

    errorResponse

};