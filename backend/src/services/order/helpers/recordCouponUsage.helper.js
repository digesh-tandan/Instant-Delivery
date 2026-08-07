const CouponUsageModel = require("../../../models/couponUsage.model");

const recordCouponUsage = async (

    couponId,

    userId,

    orderId,

    discount,

    connection

) => {

    if (!couponId) {

        return;

    }

    await CouponUsageModel.create(

        connection,
        
        {

            coupon_id: couponId,

            user_id: userId,

            order_id: orderId,

            discount_amount: discount

        }

    );

};

module.exports = recordCouponUsage;