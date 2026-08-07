const { pool } = require("../config/database");

class OTPModel {

    // Create OTP
    async create(connection, data) {

        const sql = `
            INSERT INTO otps
            (
                reference_type,
                reference_id,
                email,
                otp_code,
                expires_at
            )
            VALUES
            (?, ?, ?, ?, ?)
        `;

        const [result] = await connection.execute(sql, [
            data.reference_type,
            data.reference_id,
            data.email,
            data.otp_code,
            data.expires_at
        ]);

        return result.insertId;
    }

    // Find OTP
    async findOTP(reference_type, email, otp_code) {

        const sql = `
            SELECT *
            FROM otps
            WHERE reference_type = ?
            AND email = ?
            AND otp_code = ?
            LIMIT 1
        `;

        const [rows] = await pool.execute(sql, [
            reference_type,
            email,
            otp_code
        ]);

        return rows[0] || null;
    }

    // Find Latest OTP by Email
    async findLatestByEmail(reference_type, email) {

        const sql = `
            SELECT *
            FROM otps
            WHERE reference_type = ?
            AND email = ?
            ORDER BY id DESC
            LIMIT 1
        `;

        const [rows] = await pool.execute(sql, [
            reference_type,
            email
        ]);

        return rows[0] || null;
    }

    
    // Find OTP by Reference ID
     
    async findByReference(reference_type, reference_id) {

        const sql = `
            SELECT *
            FROM otps
            WHERE reference_type = ?
            AND reference_id = ?
            ORDER BY id DESC
            LIMIT 1
        `;

        const [rows] = await pool.execute(sql, [
            reference_type,
            reference_id
        ]);

        return rows[0] || null;
    }

    //Delete OTP by ID

    async delete(connection, id) {

        const sql = `
            DELETE
            FROM otps
            WHERE id = ?
        `;

        await connection.execute(sql, [id]);
    }

    //Delete OTPs by Email

    async deleteByEmail(connection, reference_type, email) {

        const sql = `
            DELETE
            FROM otps
            WHERE reference_type = ?
            AND email = ?
        `;

        await connection.execute(sql, [
            reference_type,
            email
        ]);
    }

    //Delete OTPs by Reference
     
    async deleteByReference(connection, reference_type, reference_id) {

        const sql = `
            DELETE
            FROM otps
            WHERE reference_type = ?
            AND reference_id = ?
        `;

        await connection.execute(sql, [
            reference_type,
            reference_id
        ]);
    }

    
    //  Delete Expired OTPs

    async deleteExpired(connection = null) {

        const sql = `
            DELETE
            FROM otps
            WHERE expires_at < NOW()
        `;

        if (connection) {
            await connection.execute(sql);
        } else {
            await pool.execute(sql);
        }
    }

    
    // Check if OTP is Expired
    
    isExpired(expires_at) {

        return new Date(expires_at) < new Date();

    }

    // Find OTP By Email And Type

    async findByEmailAndType(
    
        email,
    
        reference_type
    
    ) {
    
        const sql = `
            SELECT *
            FROM otps
            WHERE email = ?
            AND reference_type = ?
            LIMIT 1
        `;
    
        const [rows] = await pool.execute(sql, [
        
            email,
        
            reference_type
        
        ]);
    
        return rows[0] || null;
    
    }

}

module.exports = new OTPModel();