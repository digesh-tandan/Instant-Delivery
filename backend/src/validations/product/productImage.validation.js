const {

    idParam,

    booleanField,

    integerField

} = require("../../utils/validation");

const addProductImageValidation = [

    idParam("variantId"),

    booleanField(

        "is_primary",

        {

            required: false

        }

    ),

    integerField(

        "display_order",

        {

            required: false,

            min: 1

        }

    )

];

const updateProductImageValidation = [

    idParam("imageId"),

    booleanField(

        "is_primary",

        {

            required: false

        }

    ),

    integerField(

        "display_order",

        {

            required: false,

            min: 1

        }

    )

];

const imageIdValidation = [

    idParam(

        "imageId"

    )

];

const variantIdValidation = [

    idParam(

        "variantId"

    )

];

module.exports = {

    addProductImageValidation,

    updateProductImageValidation,

    imageIdValidation,

    variantIdValidation

};