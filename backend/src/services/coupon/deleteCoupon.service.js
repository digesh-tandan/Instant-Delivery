const { pool } = require("../../config/database");

const CouponModel = require("../../models/coupon.model");

const COUPON_MESSAGES = require("../../constants/couponMessages");

const deleteCoupon = async (req) => {

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

        await connection.beginTransaction();

        await CouponModel.delete(

            connection,

            req.params.id

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

module.exports = deleteCoupon;