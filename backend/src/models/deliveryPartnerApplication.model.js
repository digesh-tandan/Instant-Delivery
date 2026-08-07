const { pool } = require("../config/database");

class DeliveryPartnerApplication {

    static async create(data) {

        const [result] = await pool.execute(
            `INSERT INTO delivery_partner_applications
            (
                user_id,
                vehicle_type,
                vehicle_number,
                driving_license
            )
            VALUES (?, ?, ?, ?)`,
            [
                data.user_id,
                data.vehicle_type,
                data.vehicle_number,
                data.driving_license
            ]
        );

        return result.insertId;

    }

    static async findPendingByUserId(userId) {

        const [rows] = await pool.execute(
            `SELECT *
            FROM delivery_partner_applications
            WHERE user_id = ?
            AND status = 'PENDING'
            LIMIT 1`,
            [userId]
        );

        return rows[0];

    }

    static async findLatestByUserId(userId) {

        const [rows] = await pool.execute(
            `SELECT *
            FROM delivery_partner_applications
            WHERE user_id = ?
            ORDER BY id DESC
            LIMIT 1`,
            [userId]
        );

        return rows[0];

    }

    static async findById(id) {

        const [rows] = await pool.execute(
            `SELECT *
            FROM delivery_partner_applications
            WHERE id=?`,
            [id]
        );

        return rows[0];

    }

    static async getAll(status, limit, offset) {
    
        let sql = `
            SELECT
                dpa.*,
                u.first_name,
                u.last_name,
                u.email,
                u.phone,
                u.role_id
            FROM delivery_partner_applications dpa
            INNER JOIN users u
                ON u.id = dpa.user_id
        `;
    
        const params = [];
    
        if (status) {
        
            sql += `
                WHERE dpa.status = ?
            `;
        
            params.push(status);
        
        }
    
        sql += `
            ORDER BY dpa.id DESC
            LIMIT ${Number(limit)}
            OFFSET ${Number(offset)}
        `;
    
        const [rows] = await pool.execute(
            sql,
            params
        );
    
        return rows;
    
    }

    static async updateStatus(id, data) {

        await pool.execute(
            `UPDATE delivery_partner_applications
            SET
                status=?,
                remarks=?,
                approved_by=?,
                approved_at=NOW()
            WHERE id=?`,
            [
                data.status,
                data.remarks,
                data.approved_by,
                id
            ]
        );

    }

    static async updateStatusWithConnection(connection,id,data){

        await connection.execute(

            `UPDATE delivery_partner_applications

            SET

                status=?,

                remarks=?,

                approved_by=?,

                approved_at=NOW()

            WHERE id=?`,

            [

                data.status,

                data.remarks,

                data.approved_by,

                id

            ]

        );

    }

}

module.exports = DeliveryPartnerApplication;