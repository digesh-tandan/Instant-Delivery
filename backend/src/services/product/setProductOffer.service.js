const {

    pool

} = require("../../config/database");

const VariantModel = require("../../models/variant.model");

const PRODUCT_MESSAGES = require("../../constants/productMessages");

const {

    calculateFinalPrice

} = require("../../helpers/product.helper");

const setProductOffer = async (

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

        await VariantModel.setOffer(

            connection,

            req.params.id,

            req.body

        );

        const finalPrice = calculateFinalPrice(

            variant.mrp,

            variant.selling_price,

            req.body.offer_type,

            req.body.offer_value,

            true

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

module.exports = setProductOffer;