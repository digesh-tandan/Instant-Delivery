const { body } = require("express-validator");

exports.applyCouponValidation = [

    {

        field: "code",

        chain: body("code")
            .trim()
            .notEmpty()
            .withMessage("Coupon code is required.")

    }

];