const {

    query

} = require("express-validator");

const searchProductsValidation = [

    {

        field: "q",

        chain: query("q")

            .exists({

                checkFalsy: true

            })

            .withMessage(

                "Search keyword is required."

            )

            .bail()

            .trim()

            .isLength({

                min: 3,

                max: 255

            })

            .withMessage(

                "Search keyword must contain at least 3 characters."

            )

    }

];

module.exports = {

    searchProductsValidation

};