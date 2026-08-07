const {

    executeService

} = require("../../utils/executeService");

const statusCodes = require("../../constants/statusCodes");

const COUPON_MESSAGES = require("../../constants/couponMessages");

const CouponService = require("../../services/coupon");

exports.createCoupon = executeService(

    CouponService.createCoupon,

    statusCodes.CREATED,

    COUPON_MESSAGES.COUPON_CREATED

);

exports.getCoupons = executeService(

    CouponService.getCoupons,

    statusCodes.OK,

    COUPON_MESSAGES.COUPONS_FETCHED

);

exports.getCouponById = executeService(

    CouponService.getCouponById,

    statusCodes.OK,

    COUPON_MESSAGES.COUPON_FETCHED

);

exports.updateCoupon = executeService(

    CouponService.updateCoupon,

    statusCodes.OK,

    COUPON_MESSAGES.COUPON_UPDATED

);

exports.deleteCoupon = executeService(

    CouponService.deleteCoupon,

    statusCodes.OK,

    COUPON_MESSAGES.COUPON_DELETED

);

exports.getAvailableCoupons = executeService(

    CouponService.getAvailableCoupons,

    statusCodes.OK,

    COUPON_MESSAGES.COUPONS_FETCHED

);