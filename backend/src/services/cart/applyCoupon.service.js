const { pool } = require("../../config/database");

const CartModel = require("../../models/cart.model");

const CartItemModel = require("../../models/cartItem.model");

const CouponModel = require("../../models/coupon.model");

const validateCoupon = require("../coupon/validateCoupon.service");

const calculateCouponDiscount = require("../coupon/calculateCouponDiscount.service");

const calculateCartSummary = require("./calculateCartSummary.service");

const COUPON_MESSAGES = require("../../constants/couponMessages");

const CART_MESSAGES = require("../../constants/cartMessages");

const applyCoupon = async (req) => {

    const connection = await pool.getConnection();

    try {

        const { code } = req.body;

        const cart = await CartModel.findByUserId(

            req.user.id

        );

        if (!cart) {

            throw new Error(
            
                CART_MESSAGES.CART_NOT_FOUND
            
            );
        
        }

        const cartItems = await CartItemModel.getCartItems(

            cart.id

        );

        if (!cartItems.length) {

            throw new Error(
            
                CART_MESSAGES.CART_EMPTY
            
            );
        
        }

        const coupon = await CouponModel.findByCode(

            code

        );

        if (!coupon) {

            throw new Error(

                COUPON_MESSAGES.INVALID_COUPON

            );

        }

        const subTotal = cartItems.reduce(

            (sum, item) =>

                sum + Number(item.total_price),

            0

        );

        await validateCoupon(

            coupon,

            req.user.id,

            subTotal

        );

        const couponResult =

            calculateCouponDiscount(
            
                coupon,
            
                subTotal,
            
                30
            
            );

        await connection.beginTransaction();

        await CartModel.updateCoupon(

            connection,

            cart.id,

            coupon.id

        );

        await connection.commit();

        return await calculateCartSummary(

            cartItems,

            coupon.id,

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

module.exports = applyCoupon;