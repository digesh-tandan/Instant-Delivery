const { pool } = require("../../config/database");

const VariantModel = require("../../models/variant.model");

const ProductImageModel = require("../../models/productImage.model");

const VARIANT_MESSAGES = require("../../constants/variantMessages");

const PRODUCT_IMAGE_MESSAGES = require("../../constants/productImageMessages");

const addProductImage = async (req) => {

    const connection = await pool.getConnection();

    try {

        if (!req.file) {

            throw new Error(

                PRODUCT_IMAGE_MESSAGES.IMAGE_REQUIRED

            );

        }

        const variant = await VariantModel.findById(

            req.params.variantId

        );

        if (!variant) {

            throw new Error(

                VARIANT_MESSAGES.VARIANT_NOT_FOUND

            );

        }

        await connection.beginTransaction();

        if (

            req.body.is_primary === "true" ||

            req.body.is_primary === true

        ) {

            await ProductImageModel.clearPrimaryImage(

                connection,

                req.params.variantId

            );

        }

        const imageId = await ProductImageModel.create(

            connection,

            {

                variant_id: req.params.variantId,

                image_url: req.file.path,

                public_id: req.file.filename,

                is_primary:

                    req.body.is_primary === "true" ||

                    req.body.is_primary === true

                        ? 1

                        : 0,

                display_order:

                    req.body.display_order || 1,

                created_by:

                    req.user.id

            }

        );

        await connection.commit();

        const image = await ProductImageModel.findById(imageId);
            
        return image;

    }

    catch (error) {

        await connection.rollback();

        throw error;

    }

    finally {

        connection.release();

    }

};

module.exports = addProductImage;