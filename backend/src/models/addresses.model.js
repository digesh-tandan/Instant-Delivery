const { pool } = require("../config/database");

class AddressModel {

    // Create Address

    async create(connection, data) {

        const sql = `
            INSERT INTO addresses
            (
                user_id,
                title,
                receiver_name,
                receiver_phone,
                address_line1,
                address_line2,
                landmark,
                city,
                state,
                pincode,
                latitude,
                longitude,
                is_default,
                created_by
            )
            VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const [result] = await connection.execute(sql, [

            data.user_id,
            data.title,
            data.receiver_name,
            data.receiver_phone,
            data.address_line1,
            data.address_line2 ?? null,
            data.landmark ?? null,
            data.city,
            data.state,
            data.pincode,
            data.latitude,
            data.longitude,
            data.is_default,
            data.created_by

        ]);

        return result.insertId;

    }

    // Find Address By ID

    async findById(id) {

        const sql = `
            SELECT
                id,
                user_id,
                title,
                receiver_name,
                receiver_phone,
                address_line1,
                address_line2,
                landmark,
                city,
                state,
                pincode,
                latitude,
                longitude,
                is_default,
                created_by,
                updated_by,
                deleted_by,
                created_at,
                updated_at
            FROM addresses
            WHERE
                id = ?
            AND
                deleted_at IS NULL
            LIMIT 1
        `;

        const [rows] = await pool.execute(sql, [

            id

        ]);

        return rows[0] || null;

    }

    // Find All Addresses By User ID

    async findAllByUserId(userId) {

        const sql = `
            SELECT
                id,
                title,
                receiver_name,
                receiver_phone,
                address_line1,
                address_line2,
                landmark,
                city,
                state,
                pincode,
                latitude,
                longitude,
                is_default,
                created_at,
                updated_at
            FROM addresses
            WHERE
                user_id = ?
            AND
                deleted_at IS NULL
            ORDER BY
                is_default DESC,
                created_at DESC
        `;

        const [rows] = await pool.execute(sql, [

            userId

        ]);

        return rows;

    }

    // Find Default Address By User ID

    async findDefaultByUserId(userId) {

        const sql = `
            SELECT
                id,
                user_id,
                title,
                receiver_name,
                receiver_phone,
                address_line1,
                address_line2,
                landmark,
                city,
                state,
                pincode,
                latitude,
                longitude,
                is_default,
                created_at,
                updated_at
            FROM addresses
            WHERE
                user_id = ?
            AND
                is_default = TRUE
            AND
                deleted_at IS NULL
            LIMIT 1
        `;

        const [rows] = await pool.execute(sql, [

            userId

        ]);

        return rows[0] || null;

    }

    // Count Addresses By User ID

    async countByUserId(userId) {

        const sql = `
            SELECT
                COUNT(*) AS total
            FROM addresses
            WHERE
                user_id = ?
            AND
                deleted_at IS NULL
        `;

        const [rows] = await pool.execute(sql, [

            userId

        ]);

        return rows[0].total;

    }

    // Check Address Exists

    async exists(addressId) {

        const sql = `
            SELECT
                id
            FROM addresses
            WHERE
                id = ?
            AND
                deleted_at IS NULL
            LIMIT 1
        `;

        const [rows] = await pool.execute(sql, [

            addressId

        ]);

        return rows.length > 0;

    }

    // Check Address Ownership

    async isOwnedByUser(addressId, userId) {

        const sql = `
            SELECT
                id
            FROM addresses
            WHERE
                id = ?
            AND
                user_id = ?
            AND
                deleted_at IS NULL
            LIMIT 1
        `;

        const [rows] = await pool.execute(sql, [

            addressId,
            userId

        ]);

        return rows.length > 0;

    }

        // Update Address

    async update(connection, addressId, data) {

        const fields = [];
        const values = [];

        if (data.title !== undefined) {
            fields.push("title = ?");
            values.push(data.title);
        }

        if (data.receiver_name !== undefined) {
            fields.push("receiver_name = ?");
            values.push(data.receiver_name);
        }

        if (data.receiver_phone !== undefined) {
            fields.push("receiver_phone = ?");
            values.push(data.receiver_phone);
        }

        if (data.address_line1 !== undefined) {
            fields.push("address_line1 = ?");
            values.push(data.address_line1);
        }

        if (data.address_line2 !== undefined) {
            fields.push("address_line2 = ?");
            values.push(data.address_line2);
        }

        if (data.landmark !== undefined) {
            fields.push("landmark = ?");
            values.push(data.landmark);
        }

        if (data.city !== undefined) {
            fields.push("city = ?");
            values.push(data.city);
        }

        if (data.state !== undefined) {
            fields.push("state = ?");
            values.push(data.state);
        }

        if (data.pincode !== undefined) {
            fields.push("pincode = ?");
            values.push(data.pincode);
        }

        if (data.latitude !== undefined) {
            fields.push("latitude = ?");
            values.push(data.latitude);
        }

        if (data.longitude !== undefined) {
            fields.push("longitude = ?");
            values.push(data.longitude);
        }

        if (data.updated_by !== undefined) {
            fields.push("updated_by = ?");
            values.push(data.updated_by);
        }

        fields.push("updated_at = CURRENT_TIMESTAMP");

        values.push(addressId);

        const sql = `
            UPDATE addresses
            SET ${fields.join(", ")}
            WHERE
                id = ?
            AND
                deleted_at IS NULL
        `;

        const [result] = await connection.execute(sql, values);

        return result.affectedRows;

    }

    // Clear Default Address By User ID

    async clearDefaultByUserId(connection, userId) {

        const sql = `
            UPDATE addresses
            SET
                is_default = FALSE
            WHERE
                user_id = ?
            AND
                deleted_at IS NULL
        `;

        await connection.execute(sql, [

            userId

        ]);

    }

    // Set Default Address

    async setDefault(connection, addressId) {

        const sql = `
            UPDATE addresses
            SET
                is_default = TRUE
            WHERE
                id = ?
            AND
                deleted_at IS NULL
        `;

        const [result] = await connection.execute(sql, [

            addressId

        ]);

        return result.affectedRows;

    }

    // Soft Delete Address

    async softDelete(
        connection,
        addressId,
        deletedBy
    ) {

        const sql = `
            UPDATE addresses
            SET
                deleted_at = NOW(),
                deleted_by = ?,
                is_default = FALSE
            WHERE
                id = ?
            AND
                deleted_at IS NULL
        `;

        const [result] = await connection.execute(sql, [

            deletedBy,

            addressId

        ]);

        return result.affectedRows;

    }

    // Find All Addresses By Admin

    async findAllByAdmin(userId) {

        const sql = `
            SELECT
                id,
                user_id,
                title,
                receiver_name,
                receiver_phone,
                address_line1,
                address_line2,
                landmark,
                city,
                state,
                pincode,
                latitude,
                longitude,
                is_default,
                created_at,
                updated_at,
                deleted_at
            FROM addresses
            WHERE
                user_id = ?
            ORDER BY
                is_default DESC,
                created_at DESC
        `;

        const [rows] = await pool.execute(

            sql,

            [

                userId

            ]

        );

        return rows;

    }

    // Find Address By ID (Admin)

    async findByIdForAdmin(addressId) {
    
        const sql = `
            SELECT
                id,
                user_id,
                title,
                receiver_name,
                receiver_phone,
                address_line1,
                address_line2,
                landmark,
                city,
                state,
                pincode,
                latitude,
                longitude,
                is_default,
                created_by,
                updated_by,
                deleted_by,
                created_at,
                updated_at,
                deleted_at
            FROM addresses
            WHERE id = ?
            LIMIT 1
        `;
    
        const [rows] = await pool.execute(
        
            sql,
        
            [
            
                addressId
            
            ]
        
        );
    
        return rows[0] || null;
    
    }

}

module.exports = new AddressModel();