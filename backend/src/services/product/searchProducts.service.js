const ProductModel = require("../../models/product.model");

const {

    groupProductsWithVariants

} = require("../../helpers/productResponse.helper");

const searchProducts = async (req) => {

    const { q } = req.query;

    const products = await ProductModel.search(

        q.trim()

    );

    return groupProductsWithVariants(

        products

    );

};

module.exports = searchProducts;