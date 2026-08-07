const {

    successResponse

} = require("../helpers/response.helper");

const executeService = (

    service,

    statusCode,

    message

) => {

    return async (

        req,

        res,

        next

    ) => {

        try {

            const data = await service(

                req

            );

            return successResponse(

                res,

                statusCode,

                message,

                data

            );

        }

        catch (

            error

        ) {

            next(

                error

            );

        }

    };

};

module.exports = {

    executeService

};