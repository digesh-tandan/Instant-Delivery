const { body } = require("express-validator");



const applyDeliveryPartnerValidation = [

    body("vehicle_type")

        .trim()

        .notEmpty()

        .withMessage("Vehicle type is required.")

        .isIn([

            "BIKE",

            "SCOOTER",

            "BICYCLE"

        ])

        .withMessage("Invalid vehicle type."),



    body("vehicle_number")

        .trim()

        .notEmpty()

        .withMessage("Vehicle number is required.")

        .isLength({

            min: 5,

            max: 20

        })

        .withMessage("Vehicle number must be between 5 and 20 characters."),



    body("driving_license")

        .trim()

        .notEmpty()

        .withMessage("Driving license is required.")

        .isLength({

            min: 8,

            max: 50

        })

        .withMessage("Invalid driving license.")

];



const reviewApplicationValidation = [

    body("status")

        .trim()

        .notEmpty()

        .withMessage("Status is required.")

        .isIn([

            "APPROVED",

            "REJECTED"

        ])

        .withMessage("Status must be APPROVED or REJECTED."),



    body("remarks")

        .optional()

        .trim()

        .isLength({

            max: 255

        })

        .withMessage("Remarks cannot exceed 255 characters.")

];



module.exports = {

    applyDeliveryPartnerValidation,

    reviewApplicationValidation

};