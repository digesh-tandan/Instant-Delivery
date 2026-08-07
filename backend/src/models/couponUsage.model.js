const { pool } = require("../config/database");

const TABLE = "coupon_usages";

class CouponUsageModel {

    static async create(connection, data) {

        const [result] = await connection.execute(

            `
            INSERT INTO ${TABLE}
            (
                coupon_id,
                user_id,
                order_id,
                discount_amount
            )
            VALUES
            (
                ?,?,?,?
            )
            `,

            [

                data.coupon_id,

                data.user_id,

                data.order_id,

                data.discount_amount

            ]

        );

        return result.insertId;

    }

    static async getTotalUsage(couponId) {

        const [rows] = await pool.execute(

            `
            SELECT COUNT(*) AS total
            FROM ${TABLE}
            WHERE coupon_id=?
            `,

            [

                couponId

            ]

        );

        return rows[0].total;

    }

    static async getUserUsage(

        couponId,

        userId

    ) {

        const [rows] = await pool.execute(

            `
            SELECT COUNT(*) AS total
            FROM ${TABLE}
            WHERE
                coupon_id=?
            AND
                user_id=?
            `,

            [

                couponId,

                userId

            ]

        );

        return rows[0].total;

    }

}

module.exports = CouponUsageModel;