const {

    executeService

} = require("../../utils/executeService");

const statusCodes = require("../../constants/statusCodes");

const CART_MESSAGES = require("../../constants/cartMessages");

const CartService = require("../../services/cart");

exports.addToCart = executeService(

    CartService.addToCart,

    statusCodes.CREATED,

    CART_MESSAGES.ITEM_ADDED

);

exports.getCart = executeService(

    CartService.getCart,

    statusCodes.OK,

    CART_MESSAGES.CART_FETCHED

);

exports.updateCartItem = executeService(

    CartService.updateCartItem,

    statusCodes.OK,

    CART_MESSAGES.ITEM_UPDATED

);

exports.removeCartItem = executeService(

    CartService.removeCartItem,

    statusCodes.OK,

    CART_MESSAGES.ITEM_REMOVED

);

exports.clearCart = executeService(

    CartService.clearCart,

    statusCodes.OK,

    CART_MESSAGES.CART_CLEARED

);

exports.applyCoupon = executeService(

    CartService.applyCoupon,

    statusCodes.OK,

    CART_MESSAGES.COUPON_APPLIED

);

exports.removeCoupon = executeService(

    CartService.removeCoupon,

    statusCodes.OK,

    CART_MESSAGES.COUPON_REMOVED

);