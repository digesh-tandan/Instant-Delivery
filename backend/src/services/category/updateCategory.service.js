const { pool } = require("../../config/database");

const CategoryModel = require("../../models/category.model");

const CATEGORY_MESSAGES = require("../../constants/categoryMessages");

const updateCategory = async (req) => {

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

        const duplicate = await CategoryModel.findByName(

            req.body.name

        );

        if (

            duplicate &&

            duplicate.id !== Number(req.params.id)

        ) {

            throw new Error(

                CATEGORY_MESSAGES.CATEGORY_ALREADY_EXISTS

            );

        }

        await connection.beginTransaction();

        await CategoryModel.update(

            connection,

            req.params.id,

            {

                ...req.body,

                updated_by: req.user.id

            }

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

module.exports = updateCategory;