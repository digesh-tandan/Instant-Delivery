const multer = require("multer");

const {

    CloudinaryStorage

} = require("multer-storage-cloudinary");

const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({

    cloudinary,

    params: async (

        req,

        file

    ) => ({

        folder: "products",

        resource_type: "image",

        allowed_formats: [

            "jpg",

            "jpeg",

            "png",

            "webp"

        ],

        public_id: `${

            Date.now()

        }_${

            Math.round(

                Math.random() * 1e9

            )

        }`

    })

});

const fileFilter = (

    req,

    file,

    cb

) => {

    const allowedTypes = [

        "image/jpeg",

        "image/png",

        "image/jpg",

        "image/webp"

    ];

    if (

        allowedTypes.includes(

            file.mimetype

        )

    ) {

        return cb(

            null,

            true

        );

    }

    cb(

        new Error(

            "Only JPG, JPEG, PNG and WEBP images are allowed."

        )

    );

};

const upload = multer({

    storage,

    fileFilter,

    limits: {

        fileSize: 5 * 1024 * 1024

    }

});

module.exports = upload;