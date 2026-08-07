const {

    requiredString,

    optionalString,

    decimalField,

    integerField,

    booleanField,

    idParam

} = require("../../utils/validation");

const addVariantValidation = [

    idParam("id"),

    requiredString("variant_name", {

        min: 2,

        max: 100

    }),

    optionalString("sku", {

        max: 100

    }),

    optionalString("barcode", {

        max: 100

    }),

    decimalField("mrp"),

    decimalField("selling_price"),

    decimalField("weight", {

        required: false

    }),

    optionalString("unit", {

        max: 20

    }),

    integerField("stock_quantity", {

        required: false,

        min: 0

    }),

    booleanField("is_active", {

        required: false

    })

];

const updateVariantValidation = [

    idParam("variantId"),

    requiredString("variant_name", {

        min: 2,

        max: 100

    }),

    optionalString("sku", {

        max: 100

    }),

    optionalString("barcode", {

        max: 100

    }),

    decimalField("mrp"),

    decimalField("selling_price"),

    decimalField("weight", {

        required: false

    }),

    optionalString("unit", {

        max: 20

    }),

    integerField("stock_quantity", {

        required: false,

        min: 0

    }),

    booleanField("is_active", {

        required: false

    })

];

const productIdValidation = [

    idParam("id")

];

const variantIdValidation = [

    idParam("variantId")

];

module.exports = {

    addVariantValidation,

    updateVariantValidation,

    productIdValidation,

    variantIdValidation

};