const { pool } = require("../config/database");

class StoreManagerApplicationModel {

    // Create Application

    static async create(data) {

        const [result] = await pool.execute(

            `
            INSERT INTO store_manager_applications
            (
                user_id,
                store_name,
                store_address,
                experience_years
            )
            VALUES
            (
                ?, ?, ?, ?
            )
            `,

            [

                data.user_id,

                data.store_name,

                data.store_address,

                data.experience_years

            ]

        );

        return result.insertId;

    }

    // Find By ID

    static async findById(id) {

        const [rows] = await pool.execute(

            `
            SELECT *
            FROM store_manager_applications
            WHERE id = ?
            LIMIT 1
            `,

            [

                id

            ]

        );

        return rows[0] || null;

    }

    // Find Pending Application

    static async findPendingByUserId(userId) {

        const [rows] = await pool.execute(

            `
            SELECT *
            FROM store_manager_applications
            WHERE

                user_id = ?

                AND

                status = 'PENDING'

            LIMIT 1
            `,

            [

                userId

            ]

        );

        return rows[0] || null;

    }

    // Find Latest Application

    static async findLatestByUserId(userId) {

        const [rows] = await pool.execute(

            `
            SELECT *
            FROM store_manager_applications
            WHERE user_id = ?
            ORDER BY id DESC
            LIMIT 1
            `,

            [

                userId

            ]

        );

        return rows[0] || null;

    }

    // Get All Applications

    static async getAll(

        status,

        limit,

        offset

    ) {

        let sql = `

            SELECT

                sma.*,

                u.first_name,

                u.last_name,

                u.email,

                u.phone,

                u.role_id

            FROM store_manager_applications sma

            INNER JOIN users u

                ON u.id = sma.user_id

        `;

        const params = [];

        if (status) {

            sql += `
                WHERE sma.status = ?
            `;

            params.push(status);

        }

        sql += `
            ORDER BY sma.id DESC
            LIMIT ${Number(limit)}
            OFFSET ${Number(offset)}
        `;

        const [rows] = await pool.execute(

            sql,

            params

        );

        return rows;

    }

    // Update Status

    static async updateStatusWithConnection(

        connection,

        id,

        data

    ) {

        await connection.execute(

            `
            UPDATE store_manager_applications

            SET

                status = ?,

                remarks = ?,

                approved_by = ?,

                approved_at = NOW()

            WHERE id = ?
            `,

            [

                data.status,

                data.remarks,

                data.approved_by,

                id

            ]

        );

    }

}

module.exports = StoreManagerApplicationModel;