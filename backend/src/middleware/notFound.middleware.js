const statusCodes = require("../constants/statusCodes");

module.exports = (req, res) => {

    return res.status(statusCodes.NOT_FOUND).json({

        success: false,

        message: "Invalid URL.",

        error_code: "ROUTE_NOT_FOUND",

        path: req.originalUrl,

        method: req.method

    });

};