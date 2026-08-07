const {

    integerField,

    enumField

} = require("../../utils/validation");

module.exports = [

    integerField(

        "orderId",

        {

            required: true

        }

    ),

    enumField(

        "paymentMethod",

        [
            "COD",
            "UPI",
            "CARD",
            "NETBANKING",
            "WALLET",
            "ONLINE"
        ],

        {

            required: true

        }

    ),

    enumField(

        "paymentGateway",

        [

            "RAZORPAY",

            "STRIPE",

            "PAYPAL",

            "COD"

        ],

        {

            required: true

        }

    )

];