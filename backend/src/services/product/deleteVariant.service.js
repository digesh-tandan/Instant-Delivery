const { pool } = require("../../config/database");

const VariantModel = require("../../models/variant.model");

const VARIANT_MESSAGES = require("../../constants/variantMessages");

const deleteVariant = async (req) => {

    const connection = await pool.getConnection();

    try {

        const variant = await VariantModel.findById(

            req.params.variantId

        );

        if (!variant) {

            throw new Error(

                VARIANT_MESSAGES.VARIANT_NOT_FOUND

            );

        }

        await connection.beginTransaction();

        await VariantModel.delete(

            connection,

            req.params.variantId

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

module.exports = deleteVariant;