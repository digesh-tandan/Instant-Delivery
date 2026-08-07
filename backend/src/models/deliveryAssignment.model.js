const { pool } = require("../config/database");

const TABLE = "delivery_assignments";

class DeliveryAssignmentModel {

    static async create(data, connection = pool) {

        const [result] = await connection.execute(

            `
            INSERT INTO ${TABLE}
            (
                order_id,
                delivery_partner_id,
                status
            )
            VALUES
            (
                ?, ?, ?
            )
            `,

            [

                data.order_id,

                data.delivery_partner_id,

                data.status

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

    static async findByOrderId(orderId, connection = pool) {

        const [rows] = await connection.execute(

            `
            SELECT *
            FROM ${TABLE}
            WHERE order_id = ?
            ORDER BY assigned_at DESC
            LIMIT 1
            `,

            [orderId]

        );

        return rows[0] || null;

    }

    static async findByPartnerId(partnerId, connection = pool) {

        const [rows] = await connection.execute(

            `
            SELECT *
            FROM ${TABLE}
            WHERE delivery_partner_id = ?
            ORDER BY assigned_at DESC
            `,

            [partnerId]

        );

        return rows;

    }

    static async findActiveByPartnerId(partnerId, connection = pool) {

        const [rows] = await connection.execute(

            `
            SELECT *
            FROM ${TABLE}
            WHERE delivery_partner_id = ?
            AND status IN
            (
                'ASSIGNED',
                'ACCEPTED',
                'PICKED_UP'
            )
            ORDER BY assigned_at ASC
            `,

            [partnerId]

        );

        return rows;

    }

    static async accept(

        id,

        connection = pool

    ) {

        await connection.execute(

            `
            UPDATE ${TABLE}
            SET

                status = 'ACCEPTED',

                accepted_at = NOW()

            WHERE id = ?
            `,

            [id]

        );

    }

    static async reject(

        id,

        connection = pool

    ) {

        await connection.execute(

            `
            UPDATE ${TABLE}
            SET

                status = 'REJECTED'

            WHERE id = ?
            `,

            [id]

        );

    }

    static async pickup(

        id,

        connection = pool

    ) {

        await connection.execute(

            `
            UPDATE ${TABLE}
            SET

                status = 'PICKED_UP',

                picked_up_at = NOW()

            WHERE id = ?
            `,

            [id]

        );

    }

    static async deliver(

        id,

        connection = pool

    ) {

        await connection.execute(

            `
            UPDATE ${TABLE}
            SET

                status = 'DELIVERED',

                delivered_at = NOW()

            WHERE id = ?
            `,

            [id]

        );

    }

    static async updateStatus(

        id,

        status,

        connection = pool

    ) {

        await connection.execute(

            `
            UPDATE ${TABLE}
            SET

                status = ?

            WHERE id = ?
            `,

            [

                status,

                id

            ]

        );

    }

    static async reassign(

        id,

        deliveryPartnerId,

        connection = pool

    ) {

        await connection.execute(

            `
            UPDATE ${TABLE}
            SET

                delivery_partner_id = ?,

                status = 'ASSIGNED',

                assigned_at = NOW(),

                accepted_at = NULL,

                picked_up_at = NULL,

                delivered_at = NULL

            WHERE id = ?
            `,

            [

                deliveryPartnerId,

                id

            ]

        );

    }

    static async getAssignedOrders(partnerId,connection = pool) {

        const [rows] = await connection.execute(

            `
            SELECT

                da.*,

                o.order_number,

                o.user_id,

                o.address_id,

                o.total_amount,

                o.payment_method,

                o.payment_status,

                o.order_status

            FROM ${TABLE} da

            INNER JOIN orders o

                ON o.id = da.order_id

            WHERE

                da.delivery_partner_id = ?

                AND

                da.status = 'ASSIGNED'

            ORDER BY da.assigned_at ASC
            `,
            [
                partnerId
            ]

        );

        return rows;

    }

    static async getAcceptedOrders(partnerId,connection = pool) {

        const [rows] = await connection.execute(

            `
            SELECT

                da.*,

                o.order_number,

                o.user_id,

                o.address_id,

                o.total_amount,

                o.payment_method,

                o.payment_status,

                o.order_status

            FROM delivery_assignments da

            INNER JOIN orders o

                ON o.id = da.order_id

            WHERE

                da.delivery_partner_id = ?

                AND

                da.status = 'ACCEPTED'

            ORDER BY da.assigned_at ASC
            `,

            [
            
                partnerId
            
            ]
        
        );

        return rows;

    }

    static async getPickedUpOrders(partnerId, connection = pool) {

        const [rows] = await connection.execute(

            `
            SELECT

                da.*,

                o.order_number,

                o.user_id,

                o.address_id,

                o.total_amount,

                o.payment_method,

                o.payment_status,

                o.order_status

            FROM ${TABLE} da

            INNER JOIN orders o

                ON o.id = da.order_id

            WHERE

                da.delivery_partner_id = ?

                AND

                da.status = 'PICKED_UP'

            ORDER BY da.picked_up_at ASC
            `,

            [
            
                partnerId
            
            ]

        );

        return rows;

    }

    static async getDeliveredOrders(partnerId, connection = pool) {

        const [rows] = await connection.execute(

            `
            SELECT

                da.*,

                o.order_number,

                o.user_id,

                o.address_id,

                o.total_amount,

                o.payment_method,

                o.payment_status,

                o.order_status

            FROM ${TABLE} da

            INNER JOIN orders o

                ON o.id = da.order_id

            WHERE

                da.delivery_partner_id = ?

                AND

                da.status = 'DELIVERED'

            ORDER BY da.delivered_at DESC
            `,

            [

                partnerId

            ]

        );

        return rows;

    }

    static async findActiveAssignment(
        
        orderId,
        
        connection = pool
        
    ) {
    
        const [rows] =
            await connection.execute(
            
                `
                SELECT *
                FROM delivery_assignments
                WHERE order_id = ?
                AND status IN
                (
                    'ASSIGNED',
                    'ACCEPTED',
                    'PICKED_UP'
                )
                LIMIT 1
                `,
            
                [
                
                    orderId
                
                ]
            
            );
        
        return rows[0] || null;
        
    }

    static async findTrackingDetailsByOrderId(

        orderId,

        connection = pool

    ) {

        const [rows] = await connection.execute(

            `
            SELECT

                da.id,

                da.order_id,

                da.delivery_partner_id,

                da.assigned_at,

                da.accepted_at,

                da.picked_up_at,

                da.delivered_at,

                da.status AS assignment_status,

                o.order_status,

                dp.vehicle_type,

                dp.vehicle_number,

                u.first_name,

                u.last_name,

                u.phone,

                dpl.latitude,

                dpl.longitude,

                dpl.recorded_at

            FROM delivery_assignments da

            INNER JOIN orders o

                ON o.id = da.order_id

            INNER JOIN delivery_partners dp

                ON dp.id = da.delivery_partner_id

            INNER JOIN users u

                ON u.id = dp.user_id

            LEFT JOIN

            (

                SELECT

                    d1.delivery_partner_id,

                    d1.latitude,

                    d1.longitude,

                    d1.recorded_at

                FROM delivery_partner_locations d1

                INNER JOIN

                (

                    SELECT

                        delivery_partner_id,

                        MAX(recorded_at) AS latest_record

                    FROM delivery_partner_locations

                    GROUP BY delivery_partner_id

                ) d2

                    ON d1.delivery_partner_id = d2.delivery_partner_id

                    AND d1.recorded_at = d2.latest_record

            ) dpl

                ON dpl.delivery_partner_id = dp.id

            WHERE da.order_id = ?

            ORDER BY da.assigned_at DESC

            LIMIT 1
            `,

            [

                orderId

            ]

        );

        return rows[0] || null;

    }

    static async getActiveDeliveries(

        connection = pool

    ) {

        const [rows] = await connection.execute(

            `
            SELECT

                da.id,
                da.order_id,
                da.delivery_partner_id,
                da.status,
                da.assigned_at,
                da.accepted_at,
                da.picked_up_at,

                o.order_number,
                o.order_status,
                o.total_amount,

                u.first_name,
                u.last_name,
                u.phone,

                dp.vehicle_type,
                dp.vehicle_number

            FROM delivery_assignments da

            INNER JOIN orders o
                ON o.id = da.order_id

            INNER JOIN delivery_partners dp
                ON dp.id = da.delivery_partner_id

            INNER JOIN users u
                ON u.id = dp.user_id

            WHERE da.status IN
            (
                'ASSIGNED',
                'ACCEPTED',
                'PICKED_UP'
            )

            ORDER BY da.assigned_at DESC
            `

        );

        return rows;

    }

    static async getDeliveryHistory(

        connection = pool
        
    ) {
    
        const [rows] = await connection.execute(
        
            `
            SELECT
        
                da.id,
                da.order_id,
                da.delivery_partner_id,
                da.status,
                da.assigned_at,
                da.accepted_at,
                da.picked_up_at,
                da.delivered_at,
        
                o.order_number,
                o.order_status,
                o.total_amount,
        
                u.first_name,
                u.last_name,
                u.phone,
        
                dp.vehicle_type,
                dp.vehicle_number
        
            FROM delivery_assignments da
        
            INNER JOIN orders o
                ON o.id = da.order_id
        
            INNER JOIN delivery_partners dp
                ON dp.id = da.delivery_partner_id
        
            INNER JOIN users u
                ON u.id = dp.user_id
        
            WHERE da.status = 'DELIVERED'
        
            ORDER BY da.delivered_at DESC
            `
        
        );
    
        return rows;
    
    }

}

module.exports = DeliveryAssignmentModel;