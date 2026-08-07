const {

    executeService

} = require("../../utils/executeService");

const statusCodes = require("../../constants/statusCodes");

const VARIANT_MESSAGES = require("../../constants/variantMessages");

const ProductService = require("../../services/product");

exports.addVariant = executeService(

    ProductService.addVariant,

    statusCodes.CREATED,

    VARIANT_MESSAGES.VARIANT_CREATED

);

exports.getVariants = executeService(

    ProductService.getVariants,

    statusCodes.OK,

    VARIANT_MESSAGES.VARIANTS_FETCHED

);

exports.getVariantById = executeService(

    ProductService.getVariantById,

    statusCodes.OK,

    VARIANT_MESSAGES.VARIANT_FETCHED

);

exports.updateVariant = executeService(

    ProductService.updateVariant,

    statusCodes.OK,

    VARIANT_MESSAGES.VARIANT_UPDATED

);

exports.deleteVariant = executeService(

    ProductService.deleteVariant,

    statusCodes.OK,

    VARIANT_MESSAGES.VARIANT_DELETED

);