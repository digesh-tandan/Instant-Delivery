const { pool } = require("../../config/database");

const cloudinary = require("../../config/cloudinary");

const ProductImageModel = require("../../models/productImage.model");

const PRODUCT_IMAGE_MESSAGES = require("../../constants/productImageMessages");

const updateProductImage = async (req) => {

    const connection = await pool.getConnection();

    try {

        if (!req.file) {

            throw new Error(

                PRODUCT_IMAGE_MESSAGES.IMAGE_REQUIRED

            );

        }

        const image = await ProductImageModel.findById(

            req.params.imageId

        );

        if (!image) {

            throw new Error(

                PRODUCT_IMAGE_MESSAGES.IMAGE_NOT_FOUND

            );

        }

        await connection.beginTransaction();

        if (

            req.body.is_primary === "true" ||

            req.body.is_primary === true

        ) {

            await ProductImageModel.clearPrimaryImage(

                connection,

                image.variant_id

            );

        }

        await cloudinary.uploader.destroy(

            image.public_id

        );

        await ProductImageModel.update(

            connection,

            req.params.imageId,

            {

                image_url: req.file.path,

                public_id: req.file.filename,

                is_primary:

                    req.body.is_primary === "true" ||

                    req.body.is_primary === true

                        ? 1

                        : 0,

                display_order:

                    req.body.display_order || image.display_order,

                updated_by:

                    req.user.id

            }

        );

        await connection.commit();
            
        const updatedImage = await ProductImageModel.findById(
            req.params.imageId
        );
        
        return updatedImage;

    }

    catch (error) {

        await connection.rollback();

        throw error;

    }

    finally {

        connection.release();

    }

};

module.exports = updateProductImage;