const CouponModel = require("../../models/coupon.model");

const getCoupons = async () => {

    const coupons = await CouponModel.findAll();

    return coupons;

};

module.exports = getCoupons;
