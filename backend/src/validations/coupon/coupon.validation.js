const { body } = require("express-validator");

exports.createCouponValidation = [

    {

        field: "code",

        chain: body("code")
            .trim()
            .notEmpty()
            .withMessage("Coupon code is required.")

    },

    {

        field: "title",

        chain: body("title")
            .trim()
            .notEmpty()
            .withMessage("Coupon title is required.")

    },

    {

        field: "description",

        chain: body("description")
            .optional()
            .isString()
            .withMessage("Description must be a string.")

    },

    {

        field: "discount_type",

        chain: body("discount_type")
            .isIn(["FLAT", "PERCENTAGE"])
            .withMessage("Discount type must be FLAT or PERCENTAGE.")

    },

    {

        field: "discount_value",

        chain: body("discount_value")
            .isFloat({ min: 0 })
            .withMessage("Discount value must be greater than or equal to 0.")

    },

    {

        field: "minimum_order_amount",

        chain: body("minimum_order_amount")
            .optional()
            .isFloat({ min: 0 })
            .withMessage("Minimum order amount must be greater than or equal to 0.")

    },

    {

        field: "maximum_discount",

        chain: body("maximum_discount")
            .optional()
            .isFloat({ min: 0 })
            .withMessage("Maximum discount must be greater than or equal to 0.")

    },

    {

        field: "usage_limit",

        chain: body("usage_limit")
            .optional()
            .isInt({ min: 1 })
            .withMessage("Usage limit must be at least 1.")

    },

    {

        field: "usage_per_user",

        chain: body("usage_per_user")
            .optional()
            .isInt({ min: 1 })
            .withMessage("Usage per user must be at least 1.")

    },

    {

        field: "starts_at",

        chain: body("starts_at")
            .optional()
            .isISO8601()
            .withMessage("Invalid start date.")

    },

    {

        field: "expires_at",

        chain: body("expires_at")
            .optional()
            .isISO8601()
            .withMessage("Invalid expiry date.")

    },

    {

        field: "is_active",

        chain: body("is_active")
            .optional()
            .isBoolean()
            .withMessage("is_active must be true or false.")

    },

    {

        field: "benefit_type",

        chain: body("benefit_type")
            .isIn([
                "DISCOUNT",
                "FREE_DELIVERY",
                "DISCOUNT_AND_FREE_DELIVERY"
            ])
            .withMessage("Invalid benefit type.")

    },

    {

        field: "first_order_only",

        chain: body("first_order_only")
            .optional()
            .isBoolean()
            .withMessage("first_order_only must be true or false.")

    },

    {

        field: "free_delivery",

        chain: body("free_delivery")
            .optional()
            .isBoolean()
            .withMessage("free_delivery must be true or false.")

    },

    {

        field: "maximum_delivery_discount",

        chain: body("maximum_delivery_discount")
            .optional()
            .isFloat({ min: 0 })
            .withMessage("Maximum delivery discount must be greater than or equal to 0.")

    }

];

exports.updateCouponValidation = exports.createCouponValidation;