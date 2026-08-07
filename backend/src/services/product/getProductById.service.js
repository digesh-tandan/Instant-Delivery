const ProductModel = require("../../models/product.model");

const PRODUCT_MESSAGES = require("../../constants/productMessages");

const {

    groupProductsWithVariants

} = require("../../helpers/productResponse.helper");

const getProductById = async (req) => {

    const rows = await ProductModel.findById(

        req.params.id

    );

    const products = groupProductsWithVariants(

        rows

    );

    if (

        !products.length

    ) {

        throw new Error(

            PRODUCT_MESSAGES.PRODUCT_NOT_FOUND

        );

    }

    return products[0];

};

module.exports = getProductById;