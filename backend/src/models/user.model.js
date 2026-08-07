const { pool } = require("../config/database");

class UserModel {

    // Create User

    async create(connection, data) {

        const sql = `
            INSERT INTO users
            (
                role_id,
                first_name,
                last_name,
                email,
                phone,
                password
            )
            VALUES
            (?, ?, ?, ?, ?, ?)
        `;

        const [result] = await connection.execute(sql, [

            data.role_id,
            data.first_name,
            data.last_name,
            data.email,
            data.phone,
            data.password

        ]);

        return result.insertId;

    }

    // Find User By ID

    async findById(id) {

        const sql = `
            SELECT
                id,
                role_id,
                first_name,
                last_name,
                email,
                phone,
                profile_image,
                gender,
                date_of_birth,
                is_active,
                is_verified,
                last_login,
                created_at,
                updated_at,
                deleted_at,
                scheduled_deletion_at,
                deleted_by,
                password
            FROM users
            WHERE id = ?
            LIMIT 1
        `;

        const [rows] = await pool.execute(sql, [

            id

        ]);

        return rows[0] || null;

    }

    // Find User By Email

    async findByEmail(email) {

        const sql = `
            SELECT *
            FROM users
            WHERE email = ?
            LIMIT 1
        `;

        const [rows] = await pool.execute(sql, [email]);

        return rows[0] || null;

    }

    // Find User By Phone

    async findByPhone(phone) {

        const sql = `
            SELECT *
            FROM users
            WHERE phone = ?
            LIMIT 1
        `;

        const [rows] = await pool.execute(sql, [phone]);

        return rows[0] || null;

    }

    // Check Email Exists

    async emailExists(email) {

        const sql = `
            SELECT id
            FROM users
            WHERE email = ?
            LIMIT 1
        `;

        const [rows] = await pool.execute(sql, [email]);

        return rows.length > 0;

    }

    // Check Phone Exists

    async phoneExists(phone) {

        const sql = `
            SELECT id
            FROM users
            WHERE phone = ?
            LIMIT 1
        `;

        const [rows] = await pool.execute(sql, [phone]);

        return rows.length > 0;

    }

    // Update Last Login

    async updateLastLogin(connection, id) {

        const sql = `
            UPDATE users
            SET last_login = NOW()
            WHERE id = ?
        `;

        await connection.execute(sql, [id]);

    }

    // Update Password

    async updatePassword(connection, id, password) {

        const sql = `
            UPDATE users
            SET password = ?
            WHERE id = ?
        `;

        await connection.execute(sql, [

            password,
            id

        ]);

    }

    // Update Profile

    async updateProfile(connection, id, data) {

        const fields = [];
        const values = [];
        
        if (data.first_name !== undefined) {
            fields.push("first_name = ?");
            values.push(data.first_name);
        }
    
        if (data.last_name !== undefined) {
            fields.push("last_name = ?");
            values.push(data.last_name);
        }
    
        if (data.phone !== undefined) {
            fields.push("phone = ?");
            values.push(data.phone);
        }
    
        if (data.gender !== undefined) {
            fields.push("gender = ?");
            values.push(data.gender);
        }
    
        if (data.date_of_birth !== undefined) {
            fields.push("date_of_birth = ?");
            values.push(data.date_of_birth);
        }
    
        if (data.profile_image !== undefined) {
            fields.push("profile_image = ?");
            values.push(data.profile_image);
        }
    
        fields.push("updated_at = CURRENT_TIMESTAMP");
    
        values.push(id);
    
        const sql = `
            UPDATE users
            SET ${fields.join(", ")}
            WHERE id = ?
        `;
    
        await connection.execute(sql, values);
    
    }

    // Update Profile Image

    async updateProfileImage(connection, id, profile_image) {

        const sql = `
            UPDATE users
            SET profile_image = ?
            WHERE id = ?
        `;

        await connection.execute(sql, [

            profile_image,
            id

        ]);

    }

    // Activate / Deactivate User

    async updateStatus(connection, id, status) {

        const sql = `
            UPDATE users
            SET is_active = ?
            WHERE id = ?
        `;

        await connection.execute(sql, [

            status,
            id

        ]);

    }

    // Soft Delete User

    async softDelete(
        connection,
        userId,
        deletedBy
    ) {
    
        const sql = `
            UPDATE users
            SET
                is_active = FALSE,
                deleted_at = NOW(),
                scheduled_deletion_at = DATE_ADD(NOW(), INTERVAL 30 DAY),
                deleted_by = ?
            WHERE id = ?
        `;
    
        await connection.execute(sql, [
        
            deletedBy,
        
            userId
        
        ]);
    
    }

    // Find Profile By ID

    async findProfileById(id) {
    
        const sql = `
            SELECT
                id,
                role_id,
                first_name,
                last_name,
                email,
                phone,
                profile_image,
                gender,
                date_of_birth,
                is_active,
                is_verified,
                last_login,
                created_at,
                updated_at
            FROM users
            WHERE id = ?
            LIMIT 1
        `;
    
        const [rows] = await pool.execute(sql, [
        
            id
        
        ]);
    
        return rows[0] || null;
    
    }

    // Restore Account

    async restoreAccount(connection, id) {

        const sql = `
            UPDATE users
            SET
                is_active = TRUE,
                deleted_at = NULL,
                scheduled_deletion_at = NULL,
                deleted_by = NULL
            WHERE id = ?
        `;

        await connection.execute(sql, [

            id

        ]);

    }

    // Check Restore Eligibility

    async canRestoreAccount(id) {
    
        const sql = `
            SELECT
                id,
                email,
                password,
                is_active,
                scheduled_deletion_at
            FROM users
            WHERE id = ?
            LIMIT 1
        `;
    
        const [rows] = await pool.execute(sql, [
        
            id
        
        ]);
    
        return rows[0] || null;
    
    }

    // Find All Users

    async findAll() {

        const sql = `
            SELECT
                u.id,
                u.first_name,
                u.last_name,
                u.email,
                u.phone,
                u.profile_image,
                u.is_active,
                u.is_verified,
                u.deleted_at,
                u.scheduled_deletion_at,
                u.created_at,
                r.id AS role_id,
                r.name AS role_name
            FROM users u
            INNER JOIN roles r
                ON r.id = u.role_id
            ORDER BY u.created_at DESC
        `;

        const [rows] = await pool.execute(sql);

        return rows;

    }

    // Find User Details

    async findUserById(id) {

        const sql = `
            SELECT
                u.id,
                u.role_id,
                r.name AS role_name,
                u.first_name,
                u.last_name,
                u.email,
                u.phone,
                u.profile_image,
                u.gender,
                u.date_of_birth,
                u.is_active,
                u.is_verified,
                u.last_login,
                u.created_at,
                u.updated_at,
                u.deleted_at,
                u.scheduled_deletion_at
            FROM users u
            INNER JOIN roles r
                ON r.id = u.role_id
            WHERE u.id = ?
            LIMIT 1
        `;

        const [rows] = await pool.execute(

            sql,

            [

                id

            ]

        );

        return rows[0] || null;

    }

    async updateRole(connection,userId,roleId){

        await connection.execute(

            `UPDATE users

            SET role_id=?

            WHERE id=?`,

            [

                roleId,

                userId

            ]

        );

    }
    
}

module.exports = new UserModel();