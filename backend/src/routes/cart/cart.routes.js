const express = require("express");

const router = express.Router();

const CartController = require("../../controllers/cart/cart.controller");

const authenticate = require("../../middleware/auth.middleware");

const validate = require("../../middleware/validation.middleware");

const authorize = require("../../middleware/role.middleware");

const {

    addToCartValidation,

    updateCartValidation

} = require("../../validations/cart/cart.validation");

const {

    applyCouponValidation

} = require("../../validations/cart/applyCoupon.validation");

router.post(

    "/",

    authenticate,

    validate(addToCartValidation),

    CartController.addToCart

);

router.get(

    "/",

    authenticate,

    CartController.getCart

);

router.patch(

    "/:itemId",

    authenticate,

    validate(updateCartValidation),

    CartController.updateCartItem

);

router.post(

    "/coupon",

    authenticate,

    authorize(2),

    validate(applyCouponValidation),

    CartController.applyCoupon

);

router.delete(

    "/coupon",

    authenticate,

    authorize(2),

    CartController.removeCoupon

);

router.delete(

    "/",

    authenticate,

    CartController.clearCart

);

router.delete(

    "/:itemId",

    authenticate,

    CartController.removeCartItem

);

module.exports = router;