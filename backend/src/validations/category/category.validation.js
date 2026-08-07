const {

    requiredString,

    optionalString,

    booleanField,

    integerField,

    idParam

} = require("../../utils/validation");

const addCategoryValidation = [

    requiredString("name", {

        min: 2,

        max: 100

    }),

    requiredString("slug", {

        min: 2,

        max: 120

    }),

    optionalString("image", {

        max: 500

    }),

    optionalString("description", {

        max: 255

    }),

    booleanField("is_active", {

        required: false

    }),

    integerField("display_order", {

        required: false,

        min: 0

    })

];

const updateCategoryValidation = [

    optionalString("name", {

        min: 2,

        max: 100

    }),

    optionalString("slug", {

        min: 2,

        max: 120

    }),

    optionalString("image", {

        max: 500

    }),

    optionalString("description", {

        max: 255

    }),

    booleanField("is_active", {

        required: false

    }),

    integerField("display_order", {

        required: false,

        min: 0

    })

];

const categoryIdValidation = [

    idParam("id")

];

module.exports = {

    addCategoryValidation,

    updateCategoryValidation,

    categoryIdValidation

};