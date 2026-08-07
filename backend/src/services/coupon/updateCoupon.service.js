const { pool } = require("../../config/database");

const CouponModel = require("../../models/coupon.model");

const COUPON_MESSAGES = require("../../constants/couponMessages");

const updateCoupon = async (req) => {

    const connection = await pool.getConnection();

    try {

        const coupon = await CouponModel.findById(

            req.params.id

        );

        if (!coupon) {

            throw new Error(

                COUPON_MESSAGES.COUPON_NOT_FOUND

            );

        }

        const existingCoupon = await CouponModel.findByCode(

            req.body.code

        );

        if (

            existingCoupon &&

            existingCoupon.id !== Number(req.params.id)

        ) {

            throw new Error(

                COUPON_MESSAGES.COUPON_ALREADY_EXISTS

            );

        }

        await connection.beginTransaction();

        await CouponModel.update(

            connection,

            req.params.id,

            req.body

        );

        await connection.commit();

        return null;

    }

    catch (error) {

        await connection.rollback();

        throw error;

    }

    finally {

        connection.release();

    }

};

module.exports = updateCoupon;