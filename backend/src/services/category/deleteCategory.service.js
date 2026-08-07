const { pool } = require("../../config/database");

const CategoryModel = require("../../models/category.model");

const CATEGORY_MESSAGES = require("../../constants/categoryMessages");

const deleteCategory = async (req) => {

    const connection = await pool.getConnection();

    try {

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

        const totalProducts = await CategoryModel.countProducts(

            req.params.id

        );

        if (

            totalProducts > 0

        ) {

            throw new Error(

                CATEGORY_MESSAGES.CATEGORY_HAS_PRODUCTS

            );

        }

        await connection.beginTransaction();

        await CategoryModel.softDelete(

            connection,

            req.params.id,

            req.user.id

        );

        await connection.commit();

        return null;

    }

    catch (error) {

        await connection.rollback();

        throw error;

    }

    finally {

        connection.release();

    }

};

module.exports = deleteCategory;