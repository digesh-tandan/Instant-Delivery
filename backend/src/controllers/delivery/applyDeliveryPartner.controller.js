const { validationResult } = require("express-validator");

const service = require("../../services/delivery/apply/applyDeliveryPartner.service");

module.exports = async (req, res, next) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {

            return res.status(400).json({

                success: false,

                errors: errors.array()

            });

        }

        const result = await service(

            req.user.id,

            req.body

        );

        return res.status(201).json(result);

    }

    catch (error) {

        next(error);

    }

};