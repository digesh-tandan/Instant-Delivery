const {

    requiredString,

    optionalString,

    decimalField,

    integerField,

    booleanField,

    idParam

} = require("../../utils/validation");

const addProductValidation = [

    integerField("category_id"),

    integerField("brand_id"),

    requiredString("name", {

        min: 2,

        max: 255

    }),

    requiredString("slug", {

        min: 2,

        max: 255

    }),

    optionalString("short_description", {

        max: 255

    }),

    optionalString("description"),

    optionalString("sku", {

        max: 100

    }),

    optionalString("barcode", {

        max: 100

    }),

    decimalField("mrp"),

    decimalField("selling_price"),

    integerField("stock_quantity", {

        required: false,

        min: 0

    }),

    optionalString("unit", {

        max: 30

    }),

    decimalField("weight", {

        required: false

    }),

    optionalString("thumbnail", {

        max: 500

    }),

    booleanField("is_active", {

        required: false

    })

];

const updateProductValidation = [

    ...addProductValidation

];

const productIdValidation = [

    idParam("id")

];

module.exports = {

    addProductValidation,

    updateProductValidation,

    productIdValidation

};