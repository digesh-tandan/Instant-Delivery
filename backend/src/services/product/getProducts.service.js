const ProductModel = require("../../models/product.model");

const {

    groupProductsWithVariants

} = require("../../helpers/productResponse.helper");

const getProducts = async () => {

    const products = await ProductModel.findAll();

    return groupProductsWithVariants(

        products

    );

};

module.exports = getProducts;