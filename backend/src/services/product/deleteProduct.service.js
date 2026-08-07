const {pool} = require("../../config/database");

const ProductModel = require("../../models/product.model");

const PRODUCT_MESSAGES = require("../../constants/productMessages");

const deleteProduct = async (req) => {

    const connection = await pool.getConnection();

    try {

        const product = await ProductModel.findById(

            req.params.id

        );

        if (

            !product

        ) {

            throw new Error(

                PRODUCT_MESSAGES.PRODUCT_NOT_FOUND

            );

        }

        await connection.beginTransaction();

        await ProductModel.delete(

            connection,

            req.params.id

        );

        await connection.commit();

        return null;

    }

    catch (

        error

    ) {

        await connection.rollback();

        throw error;

    }

    finally {

        connection.release();

    }

};

module.exports = deleteProduct;