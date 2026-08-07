const { pool } = require("../../config/database");

const cloudinary = require("../../config/cloudinary");

const ProductImageModel = require("../../models/productImage.model");

const PRODUCT_IMAGE_MESSAGES = require("../../constants/productImageMessages");

const deleteProductImage = async (req) => {

    const connection = await pool.getConnection();

    try {

        const image = await ProductImageModel.findById(

            req.params.imageId

        );

        if (!image) {

            throw new Error(

                PRODUCT_IMAGE_MESSAGES.IMAGE_NOT_FOUND

            );

        }

        await connection.beginTransaction();

        await cloudinary.uploader.destroy(

            image.public_id

        );

        await ProductImageModel.delete(

            connection,

            req.params.imageId,

            req.user.id

        );

        await connection.commit();

        return null;

    }

    catch (error) {

        await connection.rollback();

        throw error;

    }

    finally {

        connection.release();

    }

};

module.exports = deleteProductImage;