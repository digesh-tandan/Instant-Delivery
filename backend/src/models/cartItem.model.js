const { pool } = require("../config/database");

const TABLE = "cart_items";

class CartItemModel {

    static async create(connection, data) {

        const [result] = await connection.execute(

            `
            INSERT INTO ${TABLE}
            (
                cart_id,
                variant_id,
                quantity
            )
            VALUES
            (
                ?, ?, ?
            )
            `,

            [

                data.cart_id,

                data.variant_id,

                data.quantity

            ]

        );

        return result.insertId;

    }

    static async findByCartAndVariant(cartId, variantId) {

        const [rows] = await pool.execute(

            `
            SELECT *
            FROM ${TABLE}
            WHERE
                cart_id = ?
                AND variant_id = ?
            LIMIT 1
            `,

            [

                cartId,

                variantId

            ]

        );

        return rows[0] || null;

    }

    static async findById(itemId) {

        const [rows] = await pool.execute(

            `
            SELECT *
            FROM ${TABLE}
            WHERE
                id = ?
            LIMIT 1
            `,

            [

                itemId

            ]

        );

        return rows[0] || null;

    }

    static async updateQuantity(connection, itemId, quantity) {

        await connection.execute(

            `
            UPDATE ${TABLE}
            SET
                quantity = ?
            WHERE
                id = ?
            `,

            [

                quantity,

                itemId

            ]

        );

    }

    static async increaseQuantity(connection, itemId, quantity) {

        await connection.execute(
        
            `
            UPDATE ${TABLE}
            SET
                quantity = quantity + ?
            WHERE
                id = ?
            `,
        
            [
            
                quantity,
            
                itemId
            
            ]
        
        );
    
    }

    static async delete(connection, itemId) {

        await connection.execute(

            `
            DELETE
            FROM ${TABLE}
            WHERE
                id = ?
            `,

            [

                itemId

            ]

        );

    }

    static async clear(connection, cartId) {

        await connection.execute(

            `
            DELETE
            FROM ${TABLE}
            WHERE
                cart_id = ?
            `,

            [

                cartId

            ]

        );

    }

    static async getCartItems(cartId) {

        const [rows] = await pool.execute(

            `
            SELECT
                    
                ci.id AS item_id,
                    
                ci.cart_id,
                    
                ci.variant_id,
                    
                ci.quantity,
                    
                p.id AS product_id,
                    
                p.name AS product_name,
                    
                pv.variant_name,
                    
                pv.sku,
                    
                pv.mrp,
                    
                pv.selling_price,
                    
                pv.final_price,
                    
                pv.stock_quantity,
                    
                b.name AS brand_name,
                    
                pi.image_url AS product_image,
                    
                (pv.final_price * ci.quantity) AS total_price
                    
            FROM cart_items ci
                    
            INNER JOIN product_variants pv
                ON pv.id = ci.variant_id
                    
            INNER JOIN products p
                ON p.id = pv.product_id
                    
            LEFT JOIN brands b
                ON b.id = p.brand_id
                    
            LEFT JOIN product_images pi
                ON pi.id = (
                    
                    SELECT id
                    
                    FROM product_images
                    
                    WHERE variant_id = pv.id
                    AND deleted_at IS NULL
                    
                    ORDER BY
                    
                        is_primary DESC,
                    
                        display_order ASC,
                    
                        id ASC
                    
                    LIMIT 1
                    
                )
                    
            WHERE
                    
                ci.cart_id = ?
                    
            ORDER BY
                    
                ci.created_at DESC;
            `,

            [

                cartId

            ]

        );

        return rows;

    }

}

module.exports = CartItemModel;