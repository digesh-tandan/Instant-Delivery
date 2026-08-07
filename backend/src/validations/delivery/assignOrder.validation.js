const {

    integerField

} = require("../../utils/validation");

module.exports = [

    integerField(

        "orderId",

        {

            required: true

        }

    ),

    integerField(

        "deliveryPartnerId",

        {

            required: true

        }

    )

];