const {

    requiredString,

    optionalString,

    phoneField,

    latitudeField,

    longitudeField,

    booleanField,

    enumField,

    idParam

} = require("../../utils/validation");

const addAddressValidation = [

    enumField(
        "title",
        [
            "HOME",
            "WORK",
            "OTHER"
        ]
    ),

    requiredString("receiver_name", {

        min: 2,
        max: 100

    }),

    phoneField(

        "receiver_phone",

        {

            required: true

        }

    ),

    requiredString("address_line1", {

        min: 5,
        max: 255

    }),

    optionalString("address_line2", {

        max: 255

    }),

    optionalString("landmark", {

        max: 255

    }),

    requiredString("city", {

        min: 2,
        max: 100

    }),

    requiredString("state", {

        min: 2,
        max: 100

    }),

    requiredString("pincode", {

        min: 6,
        max: 10

    }),

    latitudeField(

        "latitude",

        {

            required: false

        }

    ),

    longitudeField(
    
        "longitude",
    
        {
        
            required: false
        
        }
    
    ),

    booleanField("is_default", {

        required: false

    })

];

const updateAddressValidation = [

    enumField(
        "title",
        [
            "HOME",
            "WORK",
            "OTHER"
        ],
        {
            required: false
        }
    ),

    optionalString("receiver_name", {

        min: 2,
        max: 100

    }),

    phoneField(

        "receiver_phone",

        {

            required: false

        }

    ),

    optionalString("address_line1", {

        min: 5,
        max: 255

    }),

    optionalString("address_line2", {

        max: 255

    }),

    optionalString("landmark", {

        max: 255

    }),

    optionalString("city", {

        min: 2,
        max: 100

    }),

    optionalString("state", {

        min: 2,
        max: 100

    }),

    optionalString("pincode", {

        min: 6,
        max: 10

    }),

    latitudeField(

        "latitude",

        {

            required: false

        }

    ),

    longitudeField(

        "longitude",

        {

            required: false

        }

    ),

    booleanField("is_default", {

        required: false

    })

];

const addressIdValidation = [

    idParam("address_id")

];

const setDefaultAddressValidation = [

    idParam("address_id")

];

module.exports = {

    addAddressValidation,

    updateAddressValidation,

    addressIdValidation,

    setDefaultAddressValidation

};