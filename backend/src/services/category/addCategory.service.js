const { pool } = require("../../config/database");

const CategoryModel = require("../../models/category.model");

const CATEGORY_MESSAGES = require("../../constants/categoryMessages");

const addCategory = async (req) => {

    const connection = await pool.getConnection();

    try {

        const {

            name,

            slug,

            image,

            description,

            is_active = true,

            display_order = 0

        } = req.body;

        const category = await CategoryModel.findByName(

            name

        );

        if (category) {

            throw new Error(

                CATEGORY_MESSAGES.CATEGORY_ALREADY_EXISTS

            );

        }

        await connection.beginTransaction();

        const id = await CategoryModel.create(

            connection,

            {

                name,

                slug,

                image,

                description,

                is_active,

                display_order,

                created_by: req.user.id

            }

        );

        await connection.commit();

        return {

            id

        };

    }

    catch (error) {

        await connection.rollback();

        throw error;

    }

    finally {

        connection.release();

    }

};

module.exports = addCategory;