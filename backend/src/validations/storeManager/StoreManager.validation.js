const { body } = require("express-validator");

const applyStoreManagerValidation = [

    body("store_name")

        .trim()

        .notEmpty()

        .withMessage("Store name is required."),

    body("store_address")

        .trim()

        .notEmpty()

        .withMessage("Store address is required."),

    body("experience_years")

        .isInt({

            min: 0,

            max: 50

        })

        .withMessage("Invalid experience.")

];

const reviewStoreManagerValidation = [

    body("status")

        .isIn([

            "APPROVED",

            "REJECTED"

        ]),

    body("remarks")

        .optional()

        .trim()

];

module.exports = {

    applyStoreManagerValidation,

    reviewStoreManagerValidation

};