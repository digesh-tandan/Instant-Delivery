const { pool } = require("../config/database");

class PendingRegistrationModel {

    
    // Create Pending Registration
     
    async create(connection, data) {

        const sql = `
            INSERT INTO pending_registrations
            (
                role_id,
                first_name,
                last_name,
                email,
                phone,
                password,
                expires_at
            )
            VALUES
            (?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await connection.execute(sql, [

            data.role_id,
                
            data.first_name,
                
            data.last_name ?? null,
                
            data.email,
                
            data.phone,
                
            data.password,
                
            data.expires_at
                
        ]);

        return result.insertId;
    }

    // Find Pending Registration by ID
    async findById(id) {

        const sql = `
            SELECT *
            FROM pending_registrations
            WHERE id = ?
            LIMIT 1
        `;

        const [rows] = await pool.execute(sql, [id]);

        return rows[0] || null;
    }

    // Find Pending Registration by Email
    async findByEmail(email) {

        const sql = `
            SELECT *
            FROM pending_registrations
            WHERE email = ?
            LIMIT 1
        `;

        const [rows] = await pool.execute(sql, [email]);

        return rows[0] || null;
    }

    // Find Pending Registration by Phone

    async findByPhone(phone) {

        const sql = `
            SELECT *
            FROM pending_registrations
            WHERE phone = ?
            LIMIT 1
        `;

        const [rows] = await pool.execute(sql, [phone]);

        return rows[0] || null;
    }
    
    // Update OTP Expiry
      
    async updateExpiry(connection, id, expires_at) {

        const sql = `
            UPDATE pending_registrations
            SET expires_at = ?
            WHERE id = ?
        `;

        await connection.execute(sql, [
            expires_at,
            id
        ]);
    }

    // Delete Pending Registration

    async delete(connection, id) {

        const sql = `
            DELETE
            FROM pending_registrations
            WHERE id = ?
        `;

        await connection.execute(sql, [id]);
    }

    // Delete Expired Pending Registrations

    async deleteExpired(connection = null) {

        const sql = `
            DELETE
            FROM pending_registrations
            WHERE expires_at < NOW()
        `;

        if (connection) {
            await connection.execute(sql);
        } else {
            await pool.execute(sql);
        }
    }

    // Check if Email Exists
    async emailExists(email) {

        const sql = `
            SELECT id
            FROM pending_registrations
            WHERE email = ?
            LIMIT 1
        `;

        const [rows] = await pool.execute(sql, [email]);

        return rows.length > 0;
    }

    // Check if Phone Exists
    async phoneExists(phone) {

        const sql = `
            SELECT id
            FROM pending_registrations
            WHERE phone = ?
            LIMIT 1
        `;

        const [rows] = await pool.execute(sql, [phone]);

        return rows.length > 0;
    }

}

module.exports = new PendingRegistrationModel();