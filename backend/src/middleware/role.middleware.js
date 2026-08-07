const statusCodes = require("../constants/statusCodes");

const AUTH_MESSAGES = require("../constants/authMessages");

const authorize = (...roles) => {

    return (

        req,

        res,

        next

    ) => {

        if (

            !roles.includes(

                req.user.role_id

            )

        ) {

            return res.status(

                statusCodes.FORBIDDEN

            ).json({

                success: false,

                message:

                    AUTH_MESSAGES.ACCESS_DENIED

            });

        }

        next();

    };

};

module.exports = authorize;