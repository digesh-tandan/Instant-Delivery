const express = require("express");

const router = express.Router();

const CouponController = require("../../controllers/coupon/coupon.controller");

const authenticate = require("../../middleware/auth.middleware");

const validate = require("../../middleware/validation.middleware");

const authorize = require("../../middleware/role.middleware");

const {

    createCouponValidation,

    updateCouponValidation

} = require("../../validations/coupon/coupon.validation");

router.post(

    "/",

    authenticate,

    authorize(1,4),

    validate(createCouponValidation),

    CouponController.createCoupon

);

router.get(

    "/",

    authenticate,

    CouponController.getCoupons

);

router.get(

    "/avl",

    authenticate,

    authorize(2),

    CouponController.getAvailableCoupons

);

router.get(

    "/:id",

    authenticate,

    CouponController.getCouponById

);

router.patch(

    "/:id",

    authenticate,

    authorize(1,4),

    validate(updateCouponValidation),

    CouponController.updateCoupon

);

router.delete(

    "/:id",

    authenticate,

    authorize(1,4),

    CouponController.deleteCoupon

);

module.exports = router;