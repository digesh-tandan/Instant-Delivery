const {

    integerField

} = require("../../utils/validation");

module.exports = [

    integerField(

        "assignmentId",

        {

            required: true

        }

    )

];