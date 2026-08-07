const VariantModel = require("../../models/variant.model");

const VARIANT_MESSAGES = require("../../constants/variantMessages");

const getVariantById = async (req) => {

    const variant = await VariantModel.findById(

        req.params.variantId

    );

    if (!variant) {

        throw new Error(

            VARIANT_MESSAGES.VARIANT_NOT_FOUND

        );

    }

    return variant;

};

module.exports = getVariantById;