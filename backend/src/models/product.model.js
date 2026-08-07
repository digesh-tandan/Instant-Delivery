const { pool } = require("../config/database");

const ProductModel = {

    async create(connection, data) {

        const sql = `
            INSERT INTO products
            (
                category_id,
                brand_id,
                name,
                slug,
                short_description,
                description,
                thumbnail,
                is_active
            )
            VALUES
            (
                ?, ?, ?, ?, ?, ?, ?, ?
            )
        `;

        const [result] = await connection.execute(

            sql,

            [
                data.category_id,
                data.brand_id || null,
                data.name,
                data.slug,
                data.short_description,
                data.description,
                data.thumbnail,
                data.is_active
            ]

        );

        return result.insertId;

    },

    async findAll() {

        const sql = `
            SELECT
                p.id,
                p.category_id,
                p.brand_id,
                p.name,
                p.slug,
                p.short_description,
                p.description,
                p.thumbnail,
                p.is_active,
                p.created_at,
                p.updated_at,

                c.name AS category_name,

                b.name AS brand_name,

                pv.id AS variant_id,
                pv.variant_name,
                pv.sku,
                pv.barcode,
                pv.mrp,
                pv.selling_price,
                pv.final_price,
                pv.offer_type,
                pv.offer_value,
                pv.offer_start_date,
                pv.offer_end_date,
                pv.is_offer_active,
                pv.weight,
                pv.unit,
                pv.stock_quantity

            FROM products p

            INNER JOIN categories c
                ON c.id = p.category_id

            INNER JOIN brands b
                ON b.id = p.brand_id

            LEFT JOIN product_variants pv
                ON pv.product_id = p.id

            WHERE p.is_active = 1

            ORDER BY
                p.id,
                pv.id;
        `;

        const [rows] = await pool.execute(

            sql

        );

        return rows;

    },

    async findById(id) {

        const sql = `
            SELECT
                p.id,
                p.category_id,
                p.brand_id,
                p.name,
                p.slug,
                p.short_description,
                p.description,
                p.thumbnail,
                p.is_active,
                p.created_at,
                p.updated_at,

                c.name AS category_name,

                b.name AS brand_name,

                pv.id AS variant_id,
                pv.variant_name,
                pv.sku,
                pv.barcode,
                pv.mrp,
                pv.selling_price,
                pv.final_price,
                pv.offer_type,
                pv.offer_value,
                pv.offer_start_date,
                pv.offer_end_date,
                pv.is_offer_active,
                pv.weight,
                pv.unit,
                pv.stock_quantity

            FROM products p

            INNER JOIN categories c
                ON c.id = p.category_id

            INNER JOIN brands b
                ON b.id = p.brand_id

            LEFT JOIN product_variants pv
                ON pv.product_id = p.id

            WHERE
                p.id = ?

            ORDER BY
                pv.id
        `;

        const [rows] = await pool.execute(

            sql,

            [

                id

            ]

        );

        return rows;

    },

    async findByName(name) {

        const sql = `
            SELECT
                *
            FROM
                products
            WHERE
                name = ?
            LIMIT 1
        `;

        const [rows] = await pool.execute(

            sql,

            [

                name

            ]

        );

        return rows[0] || null;

    },

    async findBySlug(slug) {

        const sql = `
            SELECT
                *
            FROM
                products
            WHERE
                slug = ?
            LIMIT 1
        `;

        const [rows] = await pool.execute(

            sql,

            [

                slug

            ]

        );

        return rows[0] || null;

    },

    async update(connection, id, data) {

        const sql = `
            UPDATE
                products
            SET
                category_id = ?,
                brand_id = ?,
                name = ?,
                slug = ?,
                short_description = ?,
                description = ?,
                thumbnail = ?,
                is_active = ?
            WHERE
                id = ?
        `;

        const [result] = await connection.execute(

            sql,

            [

                data.category_id,

                data.brand_id || null,

                data.name,

                data.slug,

                data.short_description,

                data.description,

                data.thumbnail,

                data.is_active,

                id

            ]

        );

        return result.affectedRows;

    },

    async delete(connection, id) {

        const sql = `
            DELETE
            FROM
                products
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

    async search(keyword) {

        const sql = `

            SELECT
                p.id,
                p.category_id,
                p.brand_id,
                p.name,
                p.slug,
                p.short_description,
                p.description,
                p.thumbnail,
                p.is_active,
                p.created_at,
                p.updated_at,

                c.name AS category_name,

                b.name AS brand_name,

                pv.id AS variant_id,
                pv.variant_name,
                pv.sku,
                pv.barcode,
                pv.mrp,
                pv.selling_price,
                pv.final_price,
                pv.offer_type,
                pv.offer_value,
                pv.offer_start_date,
                pv.offer_end_date,
                pv.is_offer_active,
                pv.weight,
                pv.unit,
                pv.stock_quantity

            FROM products p

            INNER JOIN categories c
                ON p.category_id = c.id

            INNER JOIN brands b
                ON p.brand_id = b.id

            LEFT JOIN product_variants pv
                ON pv.product_id = p.id

            WHERE

                p.name LIKE ?

                OR c.name LIKE ?

                OR b.name LIKE ?

                OR pv.variant_name LIKE ?

                OR pv.sku LIKE ?

                OR pv.barcode LIKE ?

            ORDER BY

                p.id,
                pv.id;

        `;

        const [

            rows

        ] = await pool.execute(

            sql,

            [
                `%${keyword}%`,
                `%${keyword}%`,
                `%${keyword}%`,
                `%${keyword}%`,
                `%${keyword}%`,
                `%${keyword}%`
            ]

        );

        return rows;

    }

};

module.exports = ProductModel;