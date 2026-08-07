const statusCodes = require("../constants/statusCodes");

const routes = [

    {
        path: "/api/v1/users/profile",
        methods: ["GET", "PATCH"]
    },

    {
        path: "/api/v1/auth/register",
        methods: ["POST"]
    },

    {
        path: "/api/v1/auth/login",
        methods: ["POST"]
    },

    {
        path: "/api/v1/auth/logout",
        methods: ["POST"]
    },

    {
        path: "/api/v1/auth/forgot-password",
        methods: ["POST"]
    },

    {
        path: "/api/v1/auth/reset-password",
        methods: ["POST"]
    },

    {
        path: "/api/v1/auth/verify-otp",
        methods: ["POST"]
    },

    {
        path: "/api/v1/auth/resend-otp",
        methods: ["POST"]
    },

    {
        path: "/api/v1/auth/refresh-token",
        methods: ["POST"]
    }

];

module.exports = (req, res, next) => {

    const route = routes.find(

        r => r.path === req.path

    );

    if (!route) {

        return next();

    }

    if (!route.methods.includes(req.method)) {

        return res.status(statusCodes.METHOD_NOT_ALLOWED).json({

            success: false,

            message: `Method ${req.method} is not allowed for this endpoint.`,

            error_code: "METHOD_NOT_ALLOWED",

            allowed_methods: route.methods

        });

    }

    next();

};