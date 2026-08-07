const multer = require("multer");

const path = require("path");

const fs = require("fs");

// Create Upload Middleware

const createUploader = (

    folder,

    allowedTypes = [

        "image/jpeg",

        "image/png",

        "image/jpg",

        "image/webp"

    ],

    maxSize = 5 * 1024 * 1024

) => {

    const uploadPath = path.join(

        __dirname,

        "../../uploads",

        folder

    );

    if (!fs.existsSync(uploadPath)) {

        fs.mkdirSync(

            uploadPath,

            {

                recursive: true

            }

        );

    }

    const storage = multer.diskStorage({

        destination: (

            req,

            file,

            cb

        ) => {

            cb(

                null,

                uploadPath

            );

        },

        filename: (

            req,

            file,

            cb

        ) => {

            const extension = path.extname(

                file.originalname

            );

            const filename =

                Date.now() +

                "_" +

                Math.round(

                    Math.random() * 1e9

                ) +

                extension;

            cb(

                null,

                filename

            );

        }

    });

    const fileFilter = (

        req,

        file,

        cb

    ) => {

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

    return multer({

        storage,

        limits: {

            fileSize: maxSize

        },

        fileFilter

    });

};

module.exports = createUploader;