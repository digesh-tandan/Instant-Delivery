const { pool } = require("../../config/database");

const CartItemModel = require("../../models/cartItem.model");
const VariantModel = require("../../models/variant.model");
const CartModel = require("../../models/cart.model");

const CART_MESSAGES = require("../../constants/cartMessages");

const calculateCartSummary = require("./calculateCartSummary.service");

const updateCartItem = async (req) => {

    const connection = await pool.getConnection();

    let transactionStarted = false;

    try {

        const { quantity } = req.body;

        const item = await CartItemModel.findById(

            req.params.itemId

        );

        if (!item) {

            throw new Error(

                CART_MESSAGES.ITEM_NOT_FOUND

            );

        }

        const variant = await VariantModel.findById(

            item.variant_id

        );

        if (!variant) {

            throw new Error(

                CART_MESSAGES.ITEM_NOT_FOUND

            );

        }

        if (quantity > variant.stock_quantity) {

            throw new Error(

                CART_MESSAGES.OUT_OF_STOCK

            );

        }

        await connection.beginTransaction();

        transactionStarted = true;

        if (quantity <= 0) {

            await CartItemModel.delete(

                connection,

                item.id

            );

        }

        else {

            await CartItemModel.updateQuantity(

                connection,

                item.id,

                quantity

            );

        }

        await connection.commit();

        transactionStarted = false;

        const cart = await CartModel.findByUserId(

            req.user.id

        );

        if (!cart) {

            throw new Error(

                CART_MESSAGES.CART_NOT_FOUND || "Cart not found"

            );

        }

        const cartItems = await CartItemModel.getCartItems(

            cart.id

        );

        return await calculateCartSummary(

            cartItems,

            cart.coupon_id,

            req.user.id

        );

    }

    catch (error) {

        if (transactionStarted) {

            await connection.rollback();

        }

        throw error;

    }

    finally {

        connection.release();

    }

};

module.exports = updateCartItem;