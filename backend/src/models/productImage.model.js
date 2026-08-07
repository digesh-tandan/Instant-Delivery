const { pool } = require("../config/database");

const TABLE = "product_images";

class ProductImageModel {

    static async create(connection, data) {

        const [result] = await connection.execute(

            `
            INSERT INTO ${TABLE}
            (
                variant_id,
                image_url,
                public_id,
                is_primary,
                display_order,
                created_by
            )
            VALUES
            (?, ?, ?, ?, ?, ?)
            `,

            [

                data.variant_id,

                data.image_url,

                data.public_id,

                data.is_primary,

                data.display_order,

                data.created_by

            ]

        );

        return result.insertId;

    }

    static async findById(id) {
    
        const [rows] = await pool.execute(
        
            `
            SELECT
                id,
                variant_id,
                image_url,
                public_id,
                is_primary,
                display_order,
                created_at,
                updated_at
            FROM ${TABLE}
            WHERE id = ?
            AND deleted_at IS NULL
            LIMIT 1
            `,
        
            [id]
        
        );
    
        return rows[0] || null;
    
    }

    static async findByVariant(variantId) {

        const [rows] = await pool.execute(

            `
            SELECT *
            FROM ${TABLE}
            WHERE variant_id = ?
            AND deleted_at IS NULL
            ORDER BY display_order ASC
            `,

            [

                variantId

            ]

        );

        return rows;

    }

    static async findPrimaryImage(variantId) {

        const [rows] = await pool.execute(

            `
            SELECT *
            FROM ${TABLE}
            WHERE variant_id = ?
            AND is_primary = 1
            AND deleted_at IS NULL
            LIMIT 1
            `,

            [

                variantId

            ]

        );

        return rows[0] || null;

    }

    static async clearPrimaryImage(connection, variantId) {

        await connection.execute(

            `
            UPDATE ${TABLE}
            SET is_primary = 0
            WHERE variant_id = ?
            `,

            [

                variantId

            ]

        );

    }

    static async update(connection, id, data) {

        await connection.execute(

            `
            UPDATE ${TABLE}
            SET
                image_url = ?,
                public_id = ?,
                is_primary = ?,
                display_order = ?,
                updated_by = ?
            WHERE id = ?
            `,

            [

                data.image_url,

                data.public_id,

                data.is_primary,

                data.display_order,

                data.updated_by,

                id

            ]

        );

    }

    static async delete(connection, id, userId) {

        await connection.execute(

            `
            UPDATE ${TABLE}
            SET
                deleted_at = NOW(),
                deleted_by = ?
            WHERE id = ?
            `,

            [

                userId,

                id

            ]

        );

    }

}

module.exports = ProductImageModel;