const {

    executeService

} = require("../../utils/executeService");

const statusCodes = require("../../constants/statusCodes");

const PRODUCT_MESSAGES = require("../../constants/productMessages");

const ProductService = require("../../services/product");

exports.addProduct = executeService(

    ProductService.addProduct,

    statusCodes.CREATED,

    PRODUCT_MESSAGES.PRODUCT_CREATED

);

exports.getProducts = executeService(

    ProductService.getProducts,

    statusCodes.OK,

    PRODUCT_MESSAGES.PRODUCTS_FETCHED

);

exports.getProductById = executeService(

    ProductService.getProductById,

    statusCodes.OK,

    PRODUCT_MESSAGES.PRODUCT_FETCHED

);

exports.updateProduct = executeService(

    ProductService.updateProduct,

    statusCodes.OK,

    PRODUCT_MESSAGES.PRODUCT_UPDATED

);

exports.deleteProduct = executeService(

    ProductService.deleteProduct,

    statusCodes.OK,

    PRODUCT_MESSAGES.PRODUCT_DELETED

);

exports.searchProducts = executeService(

    ProductService.searchProducts,

    statusCodes.OK,

    PRODUCT_MESSAGES.PRODUCTS_FETCHED

);

exports.setProductOffer = executeService(

    ProductService.setProductOffer,

    statusCodes.OK,

    PRODUCT_MESSAGES.PRODUCT_OFFER_UPDATED

);

exports.removeProductOffer = executeService(

    ProductService.removeProductOffer,

    statusCodes.OK,

    PRODUCT_MESSAGES.PRODUCT_OFFER_REMOVED

);

exports.updateStock = executeService(

    ProductService.updateStock,

    statusCodes.OK,

    PRODUCT_MESSAGES.PRODUCT_STOCK_UPDATED

);