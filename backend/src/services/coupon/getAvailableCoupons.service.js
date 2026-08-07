const CouponModel = require("../../models/coupon.model");

const CartModel = require("../../models/cart.model");

const CartItemModel = require("../../models/cartItem.model");

const validateCoupon = require("./validateCoupon.service");

const calculateCouponDiscount = require("./calculateCouponDiscount.service");

const getAvailableCoupons = async (req) => {

    const cart = await CartModel.findByUserId(

        req.user.id

    );

    if (!cart) {

        return [];

    }

    const cartItems = await CartItemModel.getCartItems(

        cart.id

    );

    if (!cartItems.length) {

        return [];

    }

    const subTotal = cartItems.reduce(

        (sum, item) =>

            sum + Number(item.total_price),

        0

    );

    const DELIVERY_CHARGE = 30;

    const coupons = await CouponModel.findActiveCoupons();

    const availableCoupons = [];

    for (const coupon of coupons) {

        try {

            await validateCoupon(

                coupon,

                req.user.id,

                subTotal

            );

            const discount =

                calculateCouponDiscount(

                    coupon,

                    subTotal,

                    DELIVERY_CHARGE

                );

            availableCoupons.push({

                id: coupon.id,

                code: coupon.code,

                title: coupon.title,

                description: coupon.description,

                benefit_type: coupon.benefit_type,

                discount_type: coupon.discount_type,

                minimum_order_amount: coupon.minimum_order_amount,

                ...discount

            });

        }

        catch (error) {

            // Skip coupons that are not applicable
        }

    }

    return availableCoupons;

};

module.exports = getAvailableCoupons;