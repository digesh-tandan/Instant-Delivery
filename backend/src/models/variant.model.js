const { pool } = require("../config/database");

const VariantModel = {

    async findById(id) {

        const sql = `
            SELECT *
            FROM product_variants
            WHERE id = ?
            LIMIT 1
        `;

        const [rows] = await pool.execute(sql, [id]);

        return rows[0] || null;

    },

    async findByProduct(productId) {

        const sql = `
            SELECT *
            FROM product_variants
            WHERE product_id = ?
            ORDER BY weight ASC
        `;

        const [rows] = await pool.execute(sql, [productId]);

        return rows;

    },

    async findByVariantName(productId, variantName) {

        const sql = `
            SELECT *
            FROM product_variants
            WHERE product_id = ?
              AND variant_name = ?
            LIMIT 1
        `;

        const [rows] = await pool.execute(

            sql,

            [

                productId,

                variantName

            ]

        );

        return rows[0] || null;

    },

    async findBySku(sku) {

        const sql = `
            SELECT *
            FROM product_variants
            WHERE sku = ?
            LIMIT 1
        `;

        const [rows] = await pool.execute(sql, [sku]);

        return rows[0] || null;

    },

    async findByBarcode(barcode) {

        const sql = `
            SELECT *
            FROM product_variants
            WHERE barcode = ?
            LIMIT 1
        `;

        const [rows] = await pool.execute(sql, [barcode]);

        return rows[0] || null;

    },

    async update(connection, id, data) {

        const sql = `
            UPDATE product_variants
            SET
                variant_name = ?,
                sku = ?,
                barcode = ?,
                mrp = ?,
                selling_price = ?,
                weight = ?,
                unit = ?,
                stock_quantity = ?,
                is_active = ?
            WHERE id = ?
        `;

        await connection.execute(

            sql,

            [

                data.variant_name,

                data.sku,

                data.barcode,

                data.mrp,

                data.selling_price,

                data.weight,

                data.unit,

                data.stock_quantity,

                data.is_active,

                id

            ]

        );

    },

    async setOffer(

        connection,

        id,

        data

    ) {

        const sql = `

            UPDATE product_variants

            SET

                offer_type = ?,

                offer_value = ?,

                offer_start_date = ?,

                offer_end_date = ?,

                is_offer_active = ?

            WHERE

                id = ?

        `;

        const [result] = await connection.execute(

            sql,

            [

                data.offer_type,

                data.offer_value,

                data.offer_start_date,

                data.offer_end_date,

                1,

                id

            ]

        );

        return result.affectedRows;

    },

    async removeOffer(

        connection,

        id

    ) {

        const sql = `

            UPDATE product_variants

            SET

                offer_type = NULL,

                offer_value = 0,

                offer_start_date = NULL,

                offer_end_date = NULL,

                is_offer_active = 0

            WHERE

                id = ?

        `;

        const [result] = await connection.execute(

            sql,

            [

                id

            ]

        );

        return result.affectedRows;

    },

    async updateStock(

        connection,

        id,

        stockQuantity

    ) {

        const sql = `

            UPDATE product_variants

            SET

                stock_quantity = ?

            WHERE

                id = ?

        `;

        const [result] = await connection.execute(

            sql,

            [

                stockQuantity,

                id

            ]

        );

        return result.affectedRows;

    },

    async updateFinalPrice(

        connection,

        id,

        finalPrice

    ) {

        const sql = `

            UPDATE product_variants

            SET

                final_price = ?

            WHERE

                id = ?

        `;

        const [result] = await connection.execute(

            sql,

            [

                finalPrice,

                id

            ]

        );

        return result.affectedRows;

    },

    async delete(connection, id) {

        const sql = `
            DELETE
            FROM product_variants
            WHERE id = ?
        `;

        await connection.execute(sql, [id]);

    },

    async create(

        connection,

        productId,

        data

    ) {

        const sql = `

            INSERT INTO product_variants
            (
                product_id,
                variant_name,
                sku,
                barcode,
                mrp,
                selling_price,
                offer_type,
                offer_value,
                final_price,
                offer_start_date,
                offer_end_date,
                is_offer_active,
                weight,
                unit,
                stock_quantity,
                is_active
            )
            VALUES
            (
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            )
        `;

        const [result] = await connection.execute(

            sql,

            [
                productId,
                        
                data.variant_name,
                        
                data.sku ?? null,
                        
                data.barcode ?? null,
                        
                data.mrp,
                        
                data.selling_price,
                        
                data.offer_type ?? null,
                        
                data.offer_value ?? 0,
                        
                data.final_price ?? data.selling_price,
                        
                data.offer_start_date ?? null,
                        
                data.offer_end_date ?? null,
                        
                data.is_offer_active ?? false,
                        
                data.weight ?? null,
                        
                data.unit ?? null,
                        
                data.stock_quantity ?? 0,
                        
                data.is_active ?? true
            ]

        );

        return result.insertId;

    },

    async decreaseStock(

        connection,

        variantId,

        quantity

    ) {

        const sql = `

            UPDATE product_variants

            SET

                stock_quantity = stock_quantity - ?

            WHERE

                id = ?

        `;

        const [result] = await connection.execute(

            sql,

            [

                quantity,

                variantId

            ]

        );

        return result.affectedRows;

    },

    async increaseStock(
        connection,
        variantId,
        quantity
    ) {
    
        const sql = `
            UPDATE product_variants
            SET stock_quantity = stock_quantity + ?
            WHERE id = ?
        `;
    
        const [result] = await connection.execute(
            sql,
            [
                quantity,
                variantId
            ]
        );
    
        return result.affectedRows;
    
    }

};

module.exports = VariantModel;