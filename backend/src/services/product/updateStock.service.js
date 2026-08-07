const {

    pool

} = require("../../config/database");

const VariantModel = require("../../models/variant.model");

const PRODUCT_MESSAGES = require("../../constants/productMessages");

const updateStock = async (

    req

) => {

    const connection = await pool.getConnection();

    try {

        const variant = await VariantModel.findById(

            req.params.id

        );

        if (

            !variant

        ) {

            throw new Error(

                PRODUCT_MESSAGES.PRODUCT_NOT_FOUND

            );

        }

        await connection.beginTransaction();

        await VariantModel.updateStock(

            connection,

            req.params.id,

            req.body.stock_quantity

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

module.exports = updateStock;