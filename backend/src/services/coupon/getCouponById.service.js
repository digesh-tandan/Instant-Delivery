const CouponModel = require("../../models/coupon.model");

const COUPON_MESSAGES = require("../../constants/couponMessages");

const getCouponById = async (req) => {

    const coupon = await CouponModel.findById(

        req.params.id

    );

    if (!coupon) {

        throw new Error(

            COUPON_MESSAGES.COUPON_NOT_FOUND

        );

    }

    return coupon;

};

module.exports = getCouponById;