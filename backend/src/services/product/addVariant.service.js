const { pool } = require("../../config/database");

const ProductModel = require("../../models/product.model");

const VariantModel = require("../../models/variant.model");

const PRODUCT_MESSAGES = require("../../constants/productMessages");

const VARIANT_MESSAGES = require("../../constants/variantMessages");

const addVariant = async (req) => {

    const connection = await pool.getConnection();

    try {

        const product = await ProductModel.findById(

            req.params.id
                
        );
        
        if (
        
            !product.length
        
        ) {
        
            throw new Error(
            
                PRODUCT_MESSAGES.PRODUCT_NOT_FOUND
            
            );
        
        }

        const existingVariant = await VariantModel.findByVariantName(

            req.params.id,

            req.body.variant_name

        );

        if (existingVariant) {

            throw new Error(

                VARIANT_MESSAGES.VARIANT_ALREADY_EXISTS

            );

        }

        if (req.body.sku) {

            const sku = await VariantModel.findBySku(

                req.body.sku

            );

            if (sku) {

                throw new Error(

                    VARIANT_MESSAGES.SKU_ALREADY_EXISTS

                );

            }

        }

        if (req.body.barcode) {

            const barcode = await VariantModel.findByBarcode(

                req.body.barcode

            );

            if (barcode) {

                throw new Error(

                    VARIANT_MESSAGES.BARCODE_ALREADY_EXISTS

                );

            }

        }

        await connection.beginTransaction();

        const variantId = await VariantModel.create(

            connection,

            req.params.id,

            req.body

        );

        await connection.commit();

        return {

            id: variantId

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

module.exports = addVariant;