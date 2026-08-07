const createUploader = require("../middleware/upload.middleware");

module.exports = {

    profile:

        createUploader(

            "profile"

        ),

    products:

        createUploader(

            "products"

        ),

    categories:

        createUploader(

            "categories"

        ),

    brands:

        createUploader(

            "brands"

        ),

    banners:

        createUploader(

            "banners"

        ),

    stores:

        createUploader(

            "stores"

        ),

    delivery:

        createUploader(

            "delivery"

        ),

    temp:

        createUploader(

            "temp"

        )

};