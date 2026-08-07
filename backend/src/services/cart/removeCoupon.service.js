const { pool } = require("../../config/database");

const CartModel = require("../../models/cart.model");

const CartItemModel = require("../../models/cartItem.model");

const calculateCartSummary = require("./calculateCartSummary.service");

const removeCoupon = async (req) => {

    const connection = await pool.getConnection();

    try {

        const cart = await CartModel.findByUserId(

            req.user.id

        );

        if (!cart) {

            throw new Error("Cart not found.");

        }

        const cartItems = await CartItemModel.getCartItems(

            cart.id

        );

        await connection.beginTransaction();

        await CartModel.updateCoupon(

            connection,

            cart.id,

            null

        );

        await connection.commit();

        return await calculateCartSummary(

            cartItems,

            null,

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

module.exports = removeCoupon;