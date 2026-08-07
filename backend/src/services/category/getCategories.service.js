const CategoryModel = require("../../models/category.model");

const getCategories = async () => {

    return await CategoryModel.findAll();

};

module.exports = getCategories;