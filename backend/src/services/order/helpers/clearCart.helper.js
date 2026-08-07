const CartItemModel = require("../../../models/cartItem.model");

const CartModel = require("../../../models/cart.model");

const clearCart = async (

    cartId,

    userId,

    connection

) => {

    await CartItemModel.clear(

        connection,

        cartId

    );

    await CartModel.updateCoupon(

        connection,
        
        cartId,
        
        null
        
    );

};

module.exports = clearCart;