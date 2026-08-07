const { pool } = require("../config/database");

const TABLE = "delivery_partners";

class DeliveryPartnerModel {

    static async create(data, connection = pool) {

        const [result] = await connection.execute(

            `
            INSERT INTO ${TABLE}
            (
                user_id,
                vehicle_type,
                vehicle_number,
                driving_license,
                is_online,
                is_available,
                created_by
            )
            VALUES
            (
                ?, ?, ?, ?, ?, ?, ?
            )
            `,

            [

                data.user_id,

                data.vehicle_type,

                data.vehicle_number,

                data.driving_license,

                data.is_online,

                data.is_available,

                data.created_by

            ]

        );

        return result.insertId;

    }

    static async findById(id, connection = pool) {

        const [rows] = await connection.execute(

            `
            SELECT *
            FROM ${TABLE}
            WHERE id = ?
            LIMIT 1
            `,

            [id]

        );

        return rows[0] || null;

    }

    static async findByIdForUpdate(id, connection = pool) {

        const [rows] = await connection.execute(

            `
            SELECT *
            FROM ${TABLE}
            WHERE id = ?
            LIMIT 1
            FOR UPDATE
            `,

            [id]

        );

        return rows[0] || null;

    }

    static async exists(id, connection = pool) {

        const [rows] = await connection.execute(

            `
            SELECT 1
            FROM ${TABLE}
            WHERE id = ?
            LIMIT 1
            `,

            [id]

        );

        return rows.length > 0;

    }

    static async findByUserId(userId, connection = pool) {

        const [rows] = await connection.execute(

            `
            SELECT *
            FROM ${TABLE}
            WHERE user_id = ?
            LIMIT 1
            `,

            [userId]

        );

        return rows[0] || null;

    }

    static async getAll(connection = pool) {

        const [rows] = await connection.execute(

            `
            SELECT *
            FROM ${TABLE}
            ORDER BY id DESC
            `

        );

        return rows;

    }

    static async findAvailablePartners(connection = pool) {

        const [rows] = await connection.execute(

            `
            SELECT *
            FROM ${TABLE}
            WHERE

                is_online = 1

                AND

                is_available = 1

            ORDER BY id ASC
            `

        );

        return rows;

    }

    static async findBusyPartners(connection = pool) {

        const [rows] = await connection.execute(

            `
            SELECT *
            FROM ${TABLE}
            WHERE

                is_online = 1

                AND

                is_available = 0

            ORDER BY id ASC
            `

        );

        return rows;

    }

    static async findOfflinePartners(connection = pool) {

        const [rows] = await connection.execute(

            `
            SELECT *
            FROM ${TABLE}
            WHERE

                is_online = 0

            ORDER BY id ASC
            `

        );

        return rows;

    }

    static async setOnline(

        id,

        connection = pool

    ) {

        await connection.execute(

            `
            UPDATE ${TABLE}
            SET

                is_online = 1

            WHERE id = ?
            `,

            [

                id

            ]

        );

    }

    static async setOffline(

        id,

        connection = pool

    ) {

        await connection.execute(

            `
            UPDATE ${TABLE}
            SET

                is_online = 0

            WHERE id = ?
            `,

            [

                id

            ]

        );

    }

    static async setAvailable(

        id,

        connection = pool

    ) {

        await connection.execute(

            `
            UPDATE ${TABLE}
            SET

                is_available = 1

            WHERE id = ?
            `,

            [

                id

            ]

        );

    }

    static async setUnavailable(

        id,

        connection = pool

    ) {

        await connection.execute(

            `
            UPDATE ${TABLE}
            SET

                is_available = 0

            WHERE id = ?
            `,

            [

                id

            ]

        );

    }

    static async updateAvailability(

        id,

        isAvailable,

        connection = pool

    ) {

        await connection.execute(

            `
            UPDATE ${TABLE}
            SET

                is_available = ?

            WHERE id = ?
            `,

            [

                isAvailable,

                id

            ]

        );

    }

    static async updateOnlineStatus(

        id,

        isOnline,

        connection = pool

    ) {

        await connection.execute(

            `
            UPDATE ${TABLE}
            SET

                is_online = ?

            WHERE id = ?
            `,

            [

                isOnline,

                id

            ]

        );

    }

    static async updateCurrentLocation(

        id,

        latitude,

        longitude,

        connection = pool

    ) {

        await connection.execute(

            `
            UPDATE ${TABLE}
            SET

                current_latitude = ?,

                current_longitude = ?

            WHERE id = ?
            `,

            [

                latitude,

                longitude,

                id

            ]

        );

    }

    static async getCurrentLocation(

        id,

        connection = pool

    ) {

        const [rows] = await connection.execute(

            `
            SELECT

                current_latitude,

                current_longitude

            FROM ${TABLE}

            WHERE id = ?

            LIMIT 1
            `,

            [id]

        );

        return rows[0] || null;

    }

    static async delete(

        id,

        updatedBy,

        connection = pool

    ) {

        await connection.execute(

            `
            UPDATE ${TABLE}
            SET

                deleted_at = NOW(),

                deleted_by = ?

            WHERE id = ?
            `,

            [

                updatedBy,

                id

            ]

        );

    }

    static async hasActiveOrder(

        partnerId,

        connection = pool

    ) {

        const [rows] =
            await connection.execute(

                `
                SELECT id
                FROM delivery_assignments
                WHERE

                    delivery_partner_id = ?

                    AND

                    status IN
                    (

                        'ASSIGNED',

                        'ACCEPTED',

                        'PICKED_UP'

                    )

                LIMIT 1
                `,

                [

                    partnerId

                ]

            );

        return rows.length > 0;

    }

    static async findByUserId(

        userId,
        
        connection = pool
        
    ) {
    
        const [rows] =
            await connection.execute(
            
                `
                SELECT *
                FROM delivery_partners
                WHERE user_id = ?
                LIMIT 1
                `,
            
                [
                
                    userId
                
                ]
            
            );
        
        return rows[0] || null;
        
    }

    static async getPartners(connection = pool) {

        const [rows] = await connection.execute(

            `
            SELECT

                dp.id,
                dp.user_id,
                dp.vehicle_type,
                dp.vehicle_number,
                dp.driving_license,
                dp.is_online,
                dp.is_available,
                dp.created_at,
                dp.updated_at,

                u.first_name,
                u.last_name,
                u.email,
                u.phone

            FROM delivery_partners dp

            INNER JOIN users u
                ON u.id = dp.user_id

            ORDER BY dp.id DESC
            `

        );

        return rows;

    }

    static async getPartnerById(

        partnerId,
        
        connection = pool
        
    ) {
    
        const [rows] = await connection.execute(
        
            `
            SELECT
        
                dp.id,
                dp.user_id,
                dp.vehicle_type,
                dp.vehicle_number,
                dp.driving_license,
                dp.is_online,
                dp.is_available,
                dp.created_at,
                dp.updated_at,
        
                u.first_name,
                u.last_name,
                u.email,
                u.phone
        
            FROM delivery_partners dp
        
            INNER JOIN users u
                ON u.id = dp.user_id
        
            WHERE dp.id = ?
        
            LIMIT 1
            `,
        
            [
            
                partnerId
            
            ]
        
        );
    
        return rows[0] || null;
    
    }

}

class DeliveryPartner {

    static async create(connection, data) {

        const [result] = await connection.execute(

            `
            INSERT INTO delivery_partners
            (
                user_id,
                vehicle_type,
                vehicle_number,
                driving_license,
                is_online,
                is_available,
                created_at,
                updated_at
            )
            VALUES
            (
                ?, ?, ?, ?, ?, ?, NOW(), NOW()
            )
            `,

            [

                data.user_id,

                data.vehicle_type,

                data.vehicle_number,

                data.driving_license,

                data.is_online ?? 0,

                data.is_available ?? 1

            ]

        );

        return result.insertId;

    }

}

module.exports = {

    DeliveryPartner,

    DeliveryPartnerModel

};