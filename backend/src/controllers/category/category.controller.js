const {

    executeService

} = require("../../utils/executeService");

const statusCodes = require("../../constants/statusCodes");

const CATEGORY_MESSAGES = require("../../constants/categoryMessages");

const CategoryService = require("../../services/category");

exports.addCategory = executeService(

    CategoryService.addCategory,

    statusCodes.CREATED,

    CATEGORY_MESSAGES.CATEGORY_CREATED

);

exports.getCategories = executeService(

    CategoryService.getCategories,

    statusCodes.OK,

    CATEGORY_MESSAGES.CATEGORIES_FETCHED

);

exports.getCategoryById = executeService(

    CategoryService.getCategoryById,

    statusCodes.OK,

    CATEGORY_MESSAGES.CATEGORY_FETCHED

);

exports.updateCategory = executeService(

    CategoryService.updateCategory,

    statusCodes.OK,

    CATEGORY_MESSAGES.CATEGORY_UPDATED

);

exports.deleteCategory = executeService(

    CategoryService.deleteCategory,

    statusCodes.OK,

    CATEGORY_MESSAGES.CATEGORY_DELETED

);

exports.searchCategories = executeService(

    CategoryService.searchCategories,

    statusCodes.OK,

    CATEGORY_MESSAGES.CATEGORY_SEARCHED

);