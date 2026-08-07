const { body } = require("express-validator");

exports.addToCartValidation = [

    {

        field: "variant_id",

        chain: body("variant_id")
            .isInt({ min: 1 })
            .withMessage("Variant ID must be a positive integer.")

    },

    {

        field: "quantity",

        chain: body("quantity")
            .isInt({ min: 1 })
            .withMessage("Quantity must be at least 1.")

    }

];

exports.updateCartValidation = [

    {

        field: "quantity",

        chain: body("quantity")
            .isInt({ min: 0 })
            .withMessage("Quantity must be greater than or equal to 0.")

    }

];