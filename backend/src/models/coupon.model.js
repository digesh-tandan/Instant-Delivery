const { pool } = require("../config/database");

const TABLE = "coupons";

class CouponModel {

    static async create(connection, data) {

        const [result] = await connection.execute(

            `
            INSERT INTO ${TABLE}
            (
                code,
                title,
                description,
                discount_type,
                discount_value,
                minimum_order_amount,
                maximum_discount,
                usage_limit,
                usage_per_user,
                starts_at,
                expires_at,
                is_active,
                benefit_type,
                first_order_only,
                free_delivery,
                maximum_delivery_discount
            )
            VALUES
            (
                ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
            )
            `,

            [

                data.code,

                data.title,

                data.description,

                data.discount_type,

                data.discount_value,

                data.minimum_order_amount,

                data.maximum_discount,

                data.usage_limit,

                data.usage_per_user,

                data.starts_at,

                data.expires_at,

                data.is_active,

                data.benefit_type,

                data.first_order_only,

                data.free_delivery,

                data.maximum_delivery_discount

            ]

        );

        return result.insertId;

    }

    static async findByCode(code) {

        const [rows] = await pool.execute(

            `
            SELECT *
            FROM ${TABLE}
            WHERE code = ?
            LIMIT 1
            `,

            [

                code

            ]

        );

        return rows[0] || null;

    }

    static async findById(id) {

        const [rows] = await pool.execute(

            `
            SELECT *
            FROM ${TABLE}
            WHERE id = ?
            LIMIT 1
            `,

            [

                id

            ]

        );

        return rows[0] || null;

    }

    static async findAll() {

        const [rows] = await pool.execute(

            `
            SELECT *
            FROM ${TABLE}
            ORDER BY id DESC
            `

        );

        return rows;

    }

    static async update(connection, id, data) {

        await connection.execute(

            `
            UPDATE ${TABLE}

            SET

                code=?,

                title=?,

                description=?,

                discount_type=?,

                discount_value=?,

                minimum_order_amount=?,

                maximum_discount=?,

                usage_limit=?,

                usage_per_user=?,

                starts_at=?,

                expires_at=?,

                is_active=?,

                benefit_type=?,

                first_order_only=?,

                free_delivery=?,

                maximum_delivery_discount=?

            WHERE id=?
            `,

            [

                data.code,

                data.title,

                data.description,

                data.discount_type,

                data.discount_value,

                data.minimum_order_amount,

                data.maximum_discount,

                data.usage_limit,

                data.usage_per_user,

                data.starts_at,

                data.expires_at,

                data.is_active,

                data.benefit_type,

                data.first_order_only,

                data.free_delivery,

                data.maximum_delivery_discount,

                id

            ]

        );

    }

    static async delete(connection, id) {

        await connection.execute(

            `
            DELETE
            FROM ${TABLE}
            WHERE id=?
            `,

            [

                id

            ]

        );

    }

    static async findActiveByCode(code) {

        const [rows] = await pool.execute(

            `
            SELECT *
            FROM ${TABLE}
            WHERE code = ?
            LIMIT 1
            `,

            [

                code

            ]

        );

        return rows[0] || null;

    }

    static async findActiveCoupons() {

        const [rows] = await pool.execute(
        
            `
            SELECT *
            FROM ${TABLE}
            WHERE is_active = 1
            ORDER BY id DESC
            `
        
        );
    
        return rows;
    
    }

}

module.exports = CouponModel;