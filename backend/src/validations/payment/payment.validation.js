const Joi = require("joi");

exports.createPayment = {

    body: Joi.object({

        orderId: Joi.number()

            .integer()

            .positive()

            .required()

    })

};