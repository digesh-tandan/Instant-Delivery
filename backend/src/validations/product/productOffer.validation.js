const {

    requiredString,

    decimalField,

    dateField,

    enumField

} = require("../../utils/validation");

const productOfferValidation = [

    enumField(

        "offer_type",

        [

            "percentage",

            "flat"

        ],

        {

            required: true

        }

    ),

    decimalField(

        "offer_value",

        {

            required: true

        }

    ),

    dateField(

        "offer_start_date",

        {

            required: true

        }

    ),

    dateField(

        "offer_end_date",

        {

            required: true

        }

    )

];

module.exports = {

    productOfferValidation

};