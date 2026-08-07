const {

    integerField

} = require("../../utils/validation");

const updateStockValidation = [

    integerField(

        "stock_quantity",

        {

            required: true

        }

    )

];

module.exports = {

    updateStockValidation

};