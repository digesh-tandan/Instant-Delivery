const { pool } = require("../../config/database");

const WishlistModel = require("../../models/wishlist.model");

const WISHLIST_MESSAGES = require("../../constants/wishlistMessages");

const removeWishlist = async (req) => {

    const connection = await pool.getConnection();

    try {

        const wishlist = await WishlistModel.findByUserAndVariant(

            req.user.id,

            req.params.variantId

        );

        if (!wishlist) {

            throw new Error(

                WISHLIST_MESSAGES.NOT_FOUND

            );

        }

        await connection.beginTransaction();

        await WishlistModel.delete(

            connection,

            req.user.id,

            req.params.variantId

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

module.exports = removeWishlist;