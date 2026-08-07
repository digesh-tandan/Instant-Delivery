const {

    integerField

} = require("../../utils/validation");

module.exports = [

    integerField(

        "paymentId",

        {

            required: true

        }

    )

];