const UserModel = require("../models/user.model");

const {
    verifyAccessToken
} = require("../helpers/token.helper");

const AUTH_MESSAGES = require("../constants/authMessages");

const statusCodes = require("../constants/statusCodes");

// Authenticate User

const authenticate = async (req,res,next) => {

    try {

        // Get Authorization Header

        const authHeader = req.headers.authorization;

        // Check Authorization Header

        if (

            !authHeader ||

            !authHeader.startsWith("Bearer ")

        ) {

            return res.status(

                statusCodes.UNAUTHORIZED

            ).json({

                success: false,

                message: AUTH_MESSAGES.UNAUTHORIZED

            });

        }

        // Extract Access Token

        const token = authHeader.split(" ")[1];

        // Verify JWT

        const payload = verifyAccessToken(

            token

        );

        // Find User

        const user = await UserModel.findById(

            payload.id

        );

        if (!user) {

            return res.status(

                statusCodes.UNAUTHORIZED

            ).json({

                success: false,

                message:

                    AUTH_MESSAGES.ACCOUNT_NOT_FOUND

            });

        }

        // Check User Status

        if (!user.is_active) {

            return res.status(

                statusCodes.FORBIDDEN

            ).json({

                success: false,

                message:

                    AUTH_MESSAGES.ACCOUNT_INACTIVE

            });

        }

        if (!user.is_verified) {

            return res.status(

                statusCodes.FORBIDDEN

            ).json({

                success: false,

                message:

                    AUTH_MESSAGES.ACCOUNT_NOT_VERIFIED

            });

        }

        // Attach User To Request

        req.user = {

            id: user.id,

            role_id: user.role_id,

            first_name: user.first_name,

            last_name: user.last_name,

            email: user.email

        };

        next();

    }

    catch (error) {

        console.error(

            "Authentication Error:",

            error

        );

        return res.status(

            statusCodes.UNAUTHORIZED

        ).json({

            success: false,

            message:

                AUTH_MESSAGES.INVALID_ACCESS_TOKEN

        });

    }

};

module.exports = authenticate;