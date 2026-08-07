const VariantModel = require("../../models/variant.model");

const ProductImageModel = require("../../models/productImage.model");

const VARIANT_MESSAGES = require("../../constants/variantMessages");

const getProductImages = async (req) => {

    const variant = await VariantModel.findById(

        req.params.variantId

    );

    if (!variant) {

        throw new Error(

            VARIANT_MESSAGES.VARIANT_NOT_FOUND

        );

    }

    return await ProductImageModel.findByVariant(

        req.params.variantId

    );

};

module.exports = getProductImages;