const CartModel = require("../../models/cart.model");

const CartItemModel = require("../../models/cartItem.model");

const calculateCartSummary = require("./calculateCartSummary.service");

const getCart = async (req) => {

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

    const cartItems = await CartItemModel.getCartItems(

        cart.id

    );

    return await calculateCartSummary(

        cartItems,
        
        cart.coupon_id,
        
        req.user.id
        
    );

};

module.exports = getCart;