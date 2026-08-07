const {pool} = require("../../config/database");

const ProductModel = require("../../models/product.model");

const CategoryModel = require("../../models/category.model");

const PRODUCT_MESSAGES = require("../../constants/productMessages");

const CATEGORY_MESSAGES = require("../../constants/categoryMessages");

const BrandModel = require("../../models/brand.model");

const updateProduct = async (req) => {

    const connection = await pool.getConnection();

    try {

        const product = await ProductModel.findById(

            req.params.id

        );

        if (

            !product

        ) {

            throw new Error(

                PRODUCT_MESSAGES.PRODUCT_NOT_FOUND

            );

        }

        const category = await CategoryModel.findById(

            req.body.category_id

        );

        if (!category || category.deleted_at) {

            throw new Error(

                CATEGORY_MESSAGES.CATEGORY_NOT_FOUND

            );

        }

        const brand = await BrandModel.findById(req.body.brand_id);

        if (!brand) {
            throw new Error(PRODUCT_MESSAGES.BRAND_NOT_FOUND);
        }

        await connection.beginTransaction();

        await ProductModel.update(

            connection,

            req.params.id,

            req.body

        );

        await connection.commit();

        return null;

    }

    catch (

        error

    ) {

        await connection.rollback();

        throw error;

    }

    finally {

        connection.release();

    }

};

module.exports = updateProduct;