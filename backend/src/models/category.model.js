const { pool } = require("../config/database");

const CategoryModel = {

    async create(connection, data) {

        const sql = `
            INSERT INTO categories
            (
                name,
                slug,
                image,
                description,
                is_active,
                display_order,
                created_by
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await connection.execute(

            sql,

            [

                data.name,

                data.slug,

                data.image,

                data.description,

                data.is_active,

                data.display_order,

                data.created_by

            ]

        );

        return result.insertId;

    },

    async findAll() {

        const sql = `
            SELECT
                *
            FROM
                categories
            WHERE
                deleted_at IS NULL
            ORDER BY
                display_order ASC,
                name ASC
        `;

        const [rows] = await pool.execute(sql);

        return rows;

    },

    async findById(id) {

        const sql = `
            SELECT
                *
            FROM
                categories
            WHERE
                id = ?
            LIMIT 1
        `;

        const [rows] = await pool.execute(

            sql,

            [

                id

            ]

        );

        return rows[0] || null;

    },

    async findByName(name) {

        const sql = `
            SELECT
                *
            FROM
                categories
            WHERE
                name = ?
                AND deleted_at IS NULL
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
                categories
            WHERE
                slug = ?
                AND deleted_at IS NULL
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
                categories
            SET
                name = ?,
                slug = ?,
                image = ?,
                description = ?,
                is_active = ?,
                display_order = ?,
                updated_by = ?
            WHERE
                id = ?
                AND deleted_at IS NULL
        `;

        const [result] = await connection.execute(

            sql,

            [

                data.name,

                data.slug,

                data.image,

                data.description,

                data.is_active,

                data.display_order,

                data.updated_by,

                id

            ]

        );

        return result.affectedRows;

    },

    async softDelete(connection, id, deletedBy) {

        const sql = `
            UPDATE
                categories
            SET
                deleted_at = NOW(),
                deleted_by = ?
            WHERE
                id = ?
                AND deleted_at IS NULL
        `;

        const [result] = await connection.execute(

            sql,

            [

                deletedBy,

                id

            ]

        );

        return result.affectedRows;

    },

    async countProducts(categoryId) {

        const sql = `
            SELECT
                COUNT(*) AS total
            FROM
                products
            WHERE
                category_id = ?
        `;

        const [rows] = await pool.execute(

            sql,

            [

                categoryId

            ]

        );

        return rows[0].total;

    },

    async search(keyword) {
        
        const sql = `
            SELECT
                id,
                name,
                slug,
                image,
                description,
                is_active,
                display_order
            FROM
                categories
            WHERE
                deleted_at IS NULL
                AND is_active = 1
                AND (
                    name LIKE ?
                    OR slug LIKE ?
                )
            ORDER BY
                display_order ASC,
                name ASC
        `;
        
        const search = `%${keyword}%`;
        
        const [rows] = await pool.execute(
        
            sql,
        
            [
            
                search,
            
                search
            
            ]
        
        );
    
        return rows;
    
    }

};

module.exports = CategoryModel;