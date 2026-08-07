const {

    passwordField

} = require("../../utils/validation");

module.exports = [

    passwordField(

        "current_password",

        true

    ),

    passwordField(

        "new_password",

        true

    )

];