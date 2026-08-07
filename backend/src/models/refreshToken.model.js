const { pool } = require("../config/database");

class RefreshTokenModel {

    // Create Refresh Token

    async create(connection, data) {

        const sql = `
            INSERT INTO refresh_tokens
            (
                user_id,
                token,
                device_name,
                ip_address,
                user_agent,
                expires_at
            )
            VALUES
            (?, ?, ?, ?, ?, ?)
        `;

        const [result] = await connection.execute(sql, [

            data.user_id,
            data.token,
            data.device_name,
            data.ip_address,
            data.user_agent,
            data.expires_at

        ]);

        return result.insertId;

    }

    // Find Refresh Token

    async findByToken(token) {

        const sql = `
            SELECT *
            FROM refresh_tokens
            WHERE token = ?
            LIMIT 1
        `;

        const [rows] = await pool.execute(sql, [

            token

        ]);

        return rows[0] || null;

    }

    // Find All User Sessions

    async findByUserId(user_id) {

        const sql = `
            SELECT *
            FROM refresh_tokens
            WHERE user_id = ?
            ORDER BY created_at DESC
        `;

        const [rows] = await pool.execute(sql, [

            user_id

        ]);

        return rows;

    }

    // Rotate Refresh Token

    async updateToken(

        connection,

        oldToken,

        newToken,

        expires_at

    ) {

        const sql = `
            UPDATE refresh_tokens
            SET
                token = ?,
                expires_at = ?,
                is_revoked = FALSE
            WHERE token = ?
        `;

        await connection.execute(sql, [

            newToken,

            expires_at,

            oldToken

        ]);

    }

    // Revoke Refresh Token
    
    async revokeToken(
    
        connection,
    
        token
    
    ) {
    
        const sql = `
            DELETE
            FROM refresh_tokens
            WHERE token = ?
        `;
    
        await connection.execute(sql, [
        
            token
        
        ]);
    
    }

    // Revoke All Sessions

    async revokeAllByUserId(

        connection,

        user_id

    ) {

        const sql = `
            UPDATE refresh_tokens
            SET is_revoked = TRUE
            WHERE user_id = ?
        `;

        await connection.execute(sql, [

            user_id

        ]);

    }

    // Delete Expired Tokens

    async deleteExpired(connection = null) {

        const sql = `
            DELETE
            FROM refresh_tokens
            WHERE expires_at < NOW()
        `;

        if (connection) {

            await connection.execute(sql);

        }

        else {

            await pool.execute(sql);

        }

    }

    // Find Active Sessions

    async findActiveSessions(userId) {

        const sql = `
            SELECT
                id,
                token,
                device_name,
                ip_address,
                user_agent,
                created_at,
                expires_at
            FROM refresh_tokens
            WHERE
                user_id = ?
            AND
                is_revoked = FALSE
            ORDER BY created_at DESC
        `;

        const [rows] = await pool.execute(sql, [

            userId

        ]);

        return rows;

    }

    // Delete Session

    async deleteSession(

        connection,

        sessionId,

        userId

    ) {

        const sql = `
            DELETE
            FROM refresh_tokens
            WHERE
                id = ?
            AND
                user_id = ?
        `;

        await connection.execute(sql, [

            sessionId,

            userId

        ]);

    }

    // Delete Other Sessions

    async deleteOtherSessions(
    
        connection,
    
        userId,
    
        currentToken
    
    ) {
    
        const sql = `
            DELETE
            FROM refresh_tokens
            WHERE
                user_id = ?
            AND
                token <> ?
        `;
    
        await connection.execute(sql, [
        
            userId,
        
            currentToken
        
        ]);
    
    }

}

module.exports = new RefreshTokenModel();