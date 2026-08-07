const CategoryModel = require("../../models/category.model");

const CATEGORY_MESSAGES = require("../../constants/categoryMessages");

const getCategoryById = async (req) => {

    const category = await CategoryModel.findById(

        req.params.id

    );

    if (

        !category ||

        category.deleted_at

    ) {

        throw new Error(

            CATEGORY_MESSAGES.CATEGORY_NOT_FOUND

        );

    }

    return category;

};

module.exports = getCategoryById;