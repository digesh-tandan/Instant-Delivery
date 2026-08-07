const { pool } = require("../../config/database");

const CartModel = require("../../models/cart.model");
const CartItemModel = require("../../models/cartItem.model");
const VariantModel = require("../../models/variant.model");

const CART_MESSAGES = require("../../constants/cartMessages");
const VARIANT_MESSAGES = require("../../constants/variantMessages");

const calculateCartSummary = require("./calculateCartSummary.service");

const addToCart = async (req) => {

    const connection = await pool.getConnection();

    try {

        const {

            variant_id,

            quantity

        } = req.body;

        const variant = await VariantModel.findById(

            variant_id

        );

        if (!variant) {

            throw new Error(

                VARIANT_MESSAGES.VARIANT_NOT_FOUND

            );

        }

        if (variant.stock_quantity < quantity) {

            throw new Error(

                CART_MESSAGES.OUT_OF_STOCK

            );

        }

        await connection.beginTransaction();

        let cart = await CartModel.findByUserId(

            req.user.id

        );

        if (!cart) {

            const cartId = await CartModel.create(

                connection,

                {

                    user_id: req.user.id,

                    coupon_id: null

                }

            );

            cart = {

                id: cartId,

                coupon_id: null

            };

        }

        const existingItem = await CartItemModel.findByCartAndVariant(

            cart.id,

            variant_id

        );

        if (existingItem) {

            const newQuantity = existingItem.quantity + quantity;

            if (newQuantity > variant.stock_quantity) {

                throw new Error(

                    CART_MESSAGES.OUT_OF_STOCK

                );

            }

            await CartItemModel.increaseQuantity(

                connection,

                existingItem.id,

                quantity

            );

        }

        else {

            await CartItemModel.create(

                connection,

                {

                    cart_id: cart.id,

                    variant_id,

                    quantity

                }

            );

        }

        await connection.commit();

        const cartItems = await CartItemModel.getCartItems(

            cart.id

        );

        return await calculateCartSummary(

            cartItems

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



module.exports = addToCart;