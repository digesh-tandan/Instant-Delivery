const { pool } = require("../config/database");

const TABLE = "wishlists";

class WishlistModel {

    static async create(connection, data) {

        const [result] = await connection.execute(

            `
            INSERT INTO ${TABLE}
            (
                user_id,
                variant_id
            )
            VALUES
            (
                ?, ?
            )
            `,

            [

                data.user_id,

                data.variant_id

            ]

        );

        return result.insertId;

    }

    static async findByUserAndVariant(userId, variantId) {

        const [rows] = await pool.execute(

            `
            SELECT *
            FROM ${TABLE}
            WHERE
                user_id = ?
                AND variant_id = ?
            LIMIT 1
            `,

            [

                userId,

                variantId

            ]

        );

        return rows[0] || null;

    }

    static async delete(connection, userId, variantId) {

        const [result] = await connection.execute(

            `
            DELETE
            FROM ${TABLE}
            WHERE
                user_id = ?
                AND variant_id = ?
            `,

            [

                userId,

                variantId

            ]

        );

        return result.affectedRows;

    }

    static async getWishlist(userId) {

        const [rows] = await pool.execute(

            `
            SELECT
                w.id,
                w.created_at,

                p.id AS product_id,
                p.name AS product_name,
                p.thumbnail,

                pv.id AS variant_id,
                pv.variant_name,
                pv.selling_price,
                pv.final_price,
                pv.stock_quantity,

                b.name AS brand_name,

                pi.image_url

            FROM wishlists w

            INNER JOIN product_variants pv
                ON pv.id = w.variant_id

            INNER JOIN products p
                ON p.id = pv.product_id

            LEFT JOIN brands b
                ON b.id = p.brand_id

            LEFT JOIN product_images pi
                ON pi.variant_id = pv.id
                AND pi.deleted_at IS NULL

            WHERE
                w.user_id = ?

            ORDER BY
                w.created_at DESC
            `,

            [

                userId

            ]

        );

        return rows;

    }

}

module.exports = WishlistModel;