const { pool } = require("../../config/database");

const CartItemModel = require("../../models/cartItem.model");

const CART_MESSAGES = require("../../constants/cartMessages");

const calculateCartSummary = require("./calculateCartSummary.service");

const removeCartItem = async (req) => {

    const connection = await pool.getConnection();

    try {

        const item = await CartItemModel.findById(

            req.params.itemId

        );

        if (!item) {

            throw new Error(

                CART_MESSAGES.ITEM_NOT_FOUND

            );

        }

        await connection.beginTransaction();

        await CartItemModel.delete(

            connection,

            item.id

        );

        await connection.commit();

        const cartItems = await CartItemModel.getCartItems(

            item.cart_id

        );

        return await calculateCartSummary(

            cartItems,
                
            cart.coupon_id,
                
            req.user.id
                
        );

    }

    catch (error) {

        await connection.rollback();

        throw error;

    }

    finally {

        connection.release();

    }

};

module.exports = removeCartItem;