const CategoryModel = require("../../models/category.model");

const CATEGORY_MESSAGES = require("../../constants/categoryMessages");

const searchCategories = async (req) => {

    const keyword = req.query.q?.trim();

    if (

        !keyword ||

        keyword.length < 3

    ) {

        throw new Error(

            CATEGORY_MESSAGES.SEARCH_KEYWORD_REQUIRED

        );

    }

    return await CategoryModel.search(

        keyword

    );

};

module.exports = searchCategories;