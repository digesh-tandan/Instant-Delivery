const CartModel = require("../../../models/cart.model");

const CartItemModel = require("../../../models/cartItem.model");

const ORDER_MESSAGES = require("../../../constants/orderMessages");

const validateCart = async (

    userId

) => {

    const cart =

        await CartModel.findByUserId(

            userId

        );

    if (!cart) {

        throw new Error(

            ORDER_MESSAGES.CART_EMPTY

        );

    }

    const items =

        await CartItemModel.getCartItems(

            cart.id

        );

    if (!items.length) {

        throw new Error(

            ORDER_MESSAGES.CART_EMPTY

        );

    }

    return {

        cart,

        items

    };

};

module.exports = validateCart;