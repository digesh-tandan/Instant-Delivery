const { pool } = require("../../config/database");

const CouponModel = require("../../models/coupon.model");

const COUPON_MESSAGES = require("../../constants/couponMessages");

const createCoupon = async (req) => {

    const connection = await pool.getConnection();

    try {

        const existingCoupon = await CouponModel.findByCode(

            req.body.code

        );

        if (existingCoupon) {

            throw new Error(

                COUPON_MESSAGES.COUPON_ALREADY_EXISTS

            );

        }

        await connection.beginTransaction();

        await CouponModel.create(

            connection,

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

module.exports = createCoupon;