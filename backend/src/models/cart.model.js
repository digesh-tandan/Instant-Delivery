const { pool } = require("../config/database");

const TABLE = "carts";

class CartModel {

    static async create(connection, data) {

        const [result] = await connection.execute(

            `
            INSERT INTO ${TABLE}
            (
                user_id,
                coupon_id
            )
            VALUES
            (
                ?, ?
            )
            `,

            [

                data.user_id,

                data.coupon_id ?? null

            ]

        );

        return result.insertId;

    }

    static async findByUserId(userId) {

        const [rows] = await pool.execute(

            `
            SELECT *
            FROM ${TABLE}
            WHERE user_id = ?
            LIMIT 1
            `,

            [

                userId

            ]

        );

        return rows[0] || null;

    }

    static async updateCoupon(connection, cartId, couponId) {

        await connection.execute(

            `
            UPDATE ${TABLE}
            SET
                coupon_id = ?
            WHERE
                id = ?
            `,

            [

                couponId,

                cartId

            ]

        );

    }

    static async findById(cartId) {
        
        const [rows] = await pool.execute(
        
            `
            SELECT *
            FROM carts
            WHERE id = ?
            LIMIT 1
            `,
        
            [cartId]
        
        );
    
        return rows[0] || null;
    
    }

}

module.exports = CartModel;