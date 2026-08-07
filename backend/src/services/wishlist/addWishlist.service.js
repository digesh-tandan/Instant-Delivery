const { pool } = require("../../config/database");

const WishlistModel = require("../../models/wishlist.model");
const VariantModel = require("../../models/variant.model");

const WISHLIST_MESSAGES = require("../../constants/wishlistMessages");
const VARIANT_MESSAGES = require("../../constants/variantMessages");

const addWishlist = async (req) => {

    const connection = await pool.getConnection();

    try {

        const variant = await VariantModel.findById(

            req.params.variantId

        );

        if (!variant) {

            throw new Error(

                VARIANT_MESSAGES.VARIANT_NOT_FOUND

            );

        }

        const wishlist = await WishlistModel.findByUserAndVariant(

            req.user.id,

            req.params.variantId

        );

        if (wishlist) {

            throw new Error(

                WISHLIST_MESSAGES.ALREADY_EXISTS

            );

        }

        await connection.beginTransaction();

        const wishlistId = await WishlistModel.create(

            connection,

            {

                user_id: req.user.id,

                variant_id: req.params.variantId

            }

        );

        await connection.commit();

        return {

            id: wishlistId

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

module.exports = addWishlist;