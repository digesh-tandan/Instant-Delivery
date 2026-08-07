const { pool } = require("../../config/database");

const ProductModel = require("../../models/product.model");
const ProductVariantModel = require("../../models/variant.model");

const CATEGORY_MESSAGES = require("../../constants/categoryMessages");
const PRODUCT_MESSAGES = require("../../constants/productMessages");

const CategoryModel = require("../../models/category.model");
const BrandModel = require("../../models/brand.model");

const {
    buildDefaultVariant
} = require("../../helpers/productVariant.helper");

const addProduct = async (req) => {

    const connection = await pool.getConnection();

    try {

        const category = await CategoryModel.findById(
            req.body.category_id
        );

        if (!category || category.deleted_at) {

            throw new Error(
                CATEGORY_MESSAGES.CATEGORY_NOT_FOUND
            );

        }

        const brand = await BrandModel.findById(
            req.body.brand_id
        );

        if (!brand) {

            throw new Error(
                PRODUCT_MESSAGES.BRAND_NOT_FOUND
            );

        }

        const product = await ProductModel.findByName(
            req.body.name
        );

        if (product) {

            throw new Error(
                PRODUCT_MESSAGES.PRODUCT_ALREADY_EXISTS
            );

        }

        await connection.beginTransaction();

        const productId = await ProductModel.create(

            connection,

            req.body

        );

        const defaultVariant = buildDefaultVariant(

            req.body

        );

        await ProductVariantModel.create(

            connection,

            productId,

            defaultVariant

        );

        await connection.commit();

        return {

            id: productId

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

module.exports = addProduct;