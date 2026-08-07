const CouponUsageModel = require("../../models/couponUsage.model");

const COUPON_MESSAGES = require("../../constants/couponMessages");

const validateCoupon = async (

    coupon,

    userId,

    subTotal

) => {

    if (!coupon) {

        throw new Error(

            COUPON_MESSAGES.INVALID_COUPON

        );

    }

    const now = new Date();

    if (!coupon.is_active) {

        throw new Error(

            COUPON_MESSAGES.COUPON_INACTIVE

        );

    }

    if (

        coupon.starts_at &&

        now < new Date(coupon.starts_at)

    ) {

        throw new Error(

            COUPON_MESSAGES.COUPON_NOT_STARTED

        );

    }

    if (

        coupon.expires_at &&

        now > new Date(coupon.expires_at)

    ) {

        throw new Error(

            COUPON_MESSAGES.COUPON_EXPIRED

        );

    }

    if (

        subTotal <

        Number(coupon.minimum_order_amount || 0)

    ) {

        throw new Error(

            COUPON_MESSAGES.MINIMUM_ORDER_NOT_MET

        );

    }

    if (coupon.usage_limit) {

        const totalUsage = await CouponUsageModel.getTotalUsage(

            coupon.id

        );

        if (

            totalUsage >= coupon.usage_limit

        ) {

            throw new Error(

                COUPON_MESSAGES.COUPON_USAGE_LIMIT_EXCEEDED

            );

        }

    }

    if (coupon.usage_per_user) {

        const userUsage = await CouponUsageModel.getUserUsage(

            coupon.id,

            userId

        );

        if (

            userUsage >= coupon.usage_per_user

        ) {

            throw new Error(

                COUPON_MESSAGES.USER_USAGE_LIMIT_EXCEEDED

            );

        }

    }

    return coupon;

};

module.exports = validateCoupon;