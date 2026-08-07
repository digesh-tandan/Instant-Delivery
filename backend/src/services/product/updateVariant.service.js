const {

    pool

} = require("../../config/database");

const VariantModel = require("../../models/variant.model");

const VARIANT_MESSAGES = require("../../constants/variantMessages");

const {

    calculateFinalPrice

} = require("../../helpers/product.helper");

const updateVariant = async (req) => {

    const connection = await pool.getConnection();

    try {

        const variant = await VariantModel.findById(

            req.params.variantId

        );

        if (

            !variant

        ) {

            throw new Error(

                VARIANT_MESSAGES.VARIANT_NOT_FOUND

            );

        }

        await connection.beginTransaction();

        await VariantModel.update(

            connection,

            req.params.variantId,

            req.body

        );

        const updatedVariant = await VariantModel.findById(

            req.params.variantId

        );

        const finalPrice = calculateFinalPrice(

            updatedVariant.mrp,

            updatedVariant.selling_price,

            updatedVariant.offer_type,

            updatedVariant.offer_value,

            updatedVariant.is_offer_active

        );

        await VariantModel.updateFinalPrice(

            connection,

            req.params.variantId,

            finalPrice

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

module.exports = updateVariant;