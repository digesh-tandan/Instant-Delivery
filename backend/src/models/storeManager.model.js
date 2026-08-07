const { pool } = require("../config/database");

const TABLE = "store_managers";

class StoreManagerModel {

    // Create Store Manager

    static async create(

        connection,

        data

    ) {

        const [result] = await connection.execute(

            `
            INSERT INTO ${TABLE}
            (
                user_id,
                store_name,
                store_address,
                experience_years,
                is_active,
                created_at,
                updated_at
            )
            VALUES
            (
                ?, ?, ?, ?, ?, NOW(), NOW()
            )
            `,

            [

                data.user_id,

                data.store_name,

                data.store_address,

                data.experience_years,

                data.is_active ?? 1

            ]

        );

        return result.insertId;

    }

    // Find By ID

    static async findById(

        id,

        connection = pool

    ) {

        const [rows] = await connection.execute(

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

    // Find By User ID

    static async findByUserId(

        userId,

        connection = pool

    ) {

        const [rows] = await connection.execute(

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

    // Check Exists

    static async exists(

        userId,

        connection = pool

    ) {

        const [rows] = await connection.execute(

            `
            SELECT id
            FROM ${TABLE}
            WHERE user_id = ?
            LIMIT 1
            `,

            [

                userId

            ]

        );

        return rows.length > 0;

    }

    // Get All Store Managers

    static async getAll(

        connection = pool

    ) {

        const [rows] = await connection.execute(

            `
            SELECT

                sm.id,

                sm.user_id,

                sm.store_name,

                sm.store_address,

                sm.experience_years,

                sm.is_active,

                sm.created_at,

                sm.updated_at,

                u.first_name,

                u.last_name,

                u.email,

                u.phone

            FROM ${TABLE} sm

            INNER JOIN users u

                ON u.id = sm.user_id

            ORDER BY sm.id DESC
            `

        );

        return rows;

    }

    // Activate / Deactivate

    static async updateStatus(

        id,

        isActive,

        connection = pool

    ) {

        await connection.execute(

            `
            UPDATE ${TABLE}

            SET

                is_active = ?

            WHERE id = ?
            `,

            [

                isActive,

                id

            ]

        );

    }

}

module.exports = StoreManagerModel;