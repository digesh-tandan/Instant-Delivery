const {

    idParam

} = require("../../utils/validation");

const adminValidation = [

    idParam("id")

];

module.exports = adminValidation;