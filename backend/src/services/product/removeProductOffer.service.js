const {

    pool

} = require("../../config/database");

const VariantModel = require("../../models/variant.model");

const PRODUCT_MESSAGES = require("../../constants/productMessages");

const {

    calculateFinalPrice

} = require("../../helpers/product.helper");

const removeProductOffer = async (

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

        await VariantModel.removeOffer(

            connection,

            req.params.id

        );

        const finalPrice = calculateFinalPrice(

            variant.mrp,

            variant.selling_price,

            null,

            0,

            false

        );

        await VariantModel.updateFinalPrice(

            connection,

            req.params.id,

            finalPrice

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

module.exports = removeProductOffer;