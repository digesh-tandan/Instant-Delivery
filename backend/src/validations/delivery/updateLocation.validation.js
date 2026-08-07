const {

    latitudeField,

    longitudeField

} = require("../../utils/validation");

module.exports = [

    latitudeField(

        "latitude",

        {

            required: true

        }

    ),

    longitudeField(

        "longitude",

        {

            required: true

        }

    )

];