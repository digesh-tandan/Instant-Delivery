const {

    executeService

} = require("../../utils/executeService");

const statusCodes = require("../../constants/statusCodes");

const PRODUCT_IMAGE_MESSAGES = require("../../constants/productImageMessages");

const ProductService = require("../../services/product");

exports.addProductImage = executeService(

    ProductService.addProductImage,

    statusCodes.CREATED,

    PRODUCT_IMAGE_MESSAGES.IMAGE_UPLOADED

);

exports.getProductImages = executeService(

    ProductService.getProductImages,

    statusCodes.OK,

    PRODUCT_IMAGE_MESSAGES.IMAGES_FETCHED

);

exports.updateProductImage = executeService(

    ProductService.updateProductImage,

    statusCodes.OK,

    PRODUCT_IMAGE_MESSAGES.IMAGE_UPDATED

);

exports.deleteProductImage = executeService(

    ProductService.deleteProductImage,

    statusCodes.OK,

    PRODUCT_IMAGE_MESSAGES.IMAGE_DELETED

);