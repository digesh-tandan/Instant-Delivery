const { body, param } = require("express-validator");

const validateRequest = require("../../middleware/validateRequest.middleware");

exports.placeOrder = [

    body("address_id")
        .isInt({ min: 1 })
        .withMessage("Valid address id is required."),

    body("payment_method")
        .isIn(["COD", "ONLINE"])
        .withMessage("Invalid payment method."),

    body("notes")
        .optional()
        .isLength({ max: 500 }),

    validateRequest

];

exports.orderId = [

    param("id")
        .isInt({ min: 1 })
        .withMessage("Invalid order id."),

    validateRequest

];

exports.updateStatus = [

    param("id")
        .isInt({ min: 1 }),

    body("status")
        .isIn([
            "PLACED",
            "CONFIRMED",
            "PACKING",
            "ASSIGNED",
            "OUT_FOR_DELIVERY",
            "DELIVERED",
            "CANCELLED",
            "RETURNED"
        ]),

    body("remarks")
        .optional()
        .isLength({ max: 500 }),

    validateRequest

];