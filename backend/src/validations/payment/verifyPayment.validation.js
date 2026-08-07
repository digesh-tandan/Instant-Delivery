const {

    integerField,

    requiredString,

    objectField

} = require("../../utils/validation");

module.exports = [

    integerField(

        "paymentId",

        {

            required: true

        }

    ),

    requiredString(

        "gatewayPaymentId",

        {

            min: 1,

            max: 255

        }

    ),

    requiredString(

        "gatewayOrderId",

        {

            min: 1,

            max: 255

        }

    ),

    requiredString(

        "gatewaySignature",

        {

            min: 1,

            max: 500

        }

    ),

    objectField(

        "gatewayResponse"

    )

];