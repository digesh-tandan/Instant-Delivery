const { pool } = require("../../config/database");

const CartModel = require("../../models/cart.model");
const CartItemModel = require("../../models/cartItem.model");

const calculateCartSummary = require("./calculateCartSummary.service");

const clearCart = async (req) => {

    const connection = await pool.getConnection();

    try {

        const cart = await CartModel.findByUserId(

            req.user.id

        );

        if (!cart) {

            return {

                cart: [],

                summary: {

                    total_items: 0,

                    total_quantity: 0,

                    sub_total: 0,

                    delivery_charge: 30,

                    handling_charge: 0,

                    coupon_discount: 0,

                    total_payable: 30

                }

            };

        }

        await connection.beginTransaction();

        await CartItemModel.clear(

            connection,

            cart.id

        );

        await connection.commit();

        return await calculateCartSummary(

            []

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

module.exports = clearCart;