const { pool } = require("../config/database");

const TABLE = "orders";

class OrderModel {

    static async create(data, connection = pool) {

        const [result] = await connection.execute(

            `
            INSERT INTO ${TABLE}
            (
                order_number,
                user_id,
                address_id,
                coupon_id,
                subtotal,
                coupon_discount,
                delivery_charge,
                delivery_discount,
                handling_charge,
                total_amount,
                payment_method,
                payment_status,
                order_status,
                notes,
                created_by
            )
            VALUES
            (
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            )
            `,

            [

                data.order_number,

                data.user_id,

                data.address_id,

                data.coupon_id,

                data.subtotal,

                data.coupon_discount,

                data.delivery_charge,

                data.delivery_discount,

                data.handling_charge,

                data.total_amount,

                data.payment_method,

                data.payment_status,

                data.order_status,

                data.notes ?? null,

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

    static async findByOrderNumber(orderNumber, connection = pool) {

        const [rows] = await connection.execute(

            `

            SELECT *

            FROM ${TABLE}

            WHERE order_number = ?

            LIMIT 1

            `,

            [orderNumber]

        );

        return rows[0] || null;

    }

    static async getOrdersByUser(userId, connection = pool) {

        const [rows] = await connection.execute(

            `

            SELECT *

            FROM ${TABLE}

            WHERE user_id = ?

            ORDER BY created_at DESC

            `,

            [userId]

        );

        return rows;

    }

    static async getAll(connection = pool) {

        const [rows] = await connection.execute(

            `

            SELECT *

            FROM ${TABLE}

            ORDER BY created_at DESC

            `

        );

        return rows;

    }

    static async updateStatus(

        id,

        orderStatus,

        updatedBy,

        connection = pool

    ) {

        const timestampColumns = {

            PLACED: "placed_at",

            CONFIRMED: "confirmed_at",

            PACKING: "packed_at",

            ASSIGNED: "assigned_at",

            OUT_FOR_DELIVERY: "out_for_delivery_at",

            DELIVERED: "delivered_at",

            RETURNED: "returned_at",

            CANCELLED: "cancelled_at"

        };

        const timestampColumn =

            timestampColumns[orderStatus];

        let query =

            `
            UPDATE ${TABLE}
            SET

                order_status = ?,

                updated_by = ?
            `;

        const values = [

            orderStatus,

            updatedBy

        ];

        if (timestampColumn) {

            query += `,

                ${timestampColumn} = NOW()
            `;

        }

        query +=

            `
            WHERE id = ?
            `;

        values.push(id);

        await connection.execute(

            query,

            values

        );

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

    static async findByPaymentStatus(

        paymentStatus,

        connection = pool

    ) {

        const [rows] = await connection.execute(

            `
            SELECT *
            FROM ${TABLE}
            WHERE payment_status = ?
            ORDER BY created_at DESC
            `,

            [paymentStatus]

        );

        return rows;

    }

    static async findByOrderStatus(

        orderStatus,

        connection = pool

    ) {

        const [rows] = await connection.execute(

            `
            SELECT *
            FROM ${TABLE}
            WHERE order_status = ?
            ORDER BY created_at DESC
            `,

            [orderStatus]

        );

        return rows;

    }

    static async updatePaymentStatus(

        id,

        paymentStatus,

        updatedBy,

        connection = pool

    ) {

        let query =

            `
            UPDATE ${TABLE}
            SET

                payment_status = ?,

                updated_by = ?
            `;

        const values = [

            paymentStatus,

            updatedBy

        ];

        if (paymentStatus === "PAID") {

            query += `,

                paid_at = NOW()
            `;

        }

        if (paymentStatus === "REFUNDED") {

            query += `,

                refunded_at = NOW()
            `;

        }

        query +=

            `
            WHERE id = ?
            `;

        values.push(id);

        await connection.execute(

            query,

            values

        );

    }

    static async updateOrderAndPaymentStatus(

        id,

        orderStatus,

        paymentStatus,

        updatedBy,

        connection = pool

    ) {

        const timestampColumns = {

            PLACED: "placed_at",

            CONFIRMED: "confirmed_at",

            PACKING: "packed_at",

            ASSIGNED: "assigned_at",

            OUT_FOR_DELIVERY: "out_for_delivery_at",

            DELIVERED: "delivered_at",

            RETURNED: "returned_at",

            CANCELLED: "cancelled_at"

        };

        const timestampColumn =

            timestampColumns[orderStatus];

        let query =

            `
            UPDATE ${TABLE}
            SET

                order_status = ?,

                payment_status = ?,

                updated_by = ?
            `;

        const values = [

            orderStatus,

            paymentStatus,

            updatedBy

        ];

        if (timestampColumn) {

            query += `,

                ${timestampColumn} = NOW()
            `;

        }

        query +=

            `
            WHERE id = ?
            `;

        values.push(id);

        await connection.execute(

            query,

            values

        );

    }

    static async updateNotes(

        id,

        notes,

        updatedBy,

        connection = pool

    ) {

        await connection.execute(

            `
            UPDATE ${TABLE}
            SET
                notes = ?,
                updated_by = ?
            WHERE id = ?
            `,

            [

                notes,

                updatedBy,

                id

            ]

        );

    }

    static async findPendingPaymentOrders(

        connection = pool

    ) {

        const [rows] = await connection.execute(

            `
            SELECT *
            FROM ${TABLE}
            WHERE payment_status = 'PENDING'
            ORDER BY created_at ASC
            `

        );

        return rows;

    }

    static async findConfirmedOrders(

        connection = pool

    ) {

        const [rows] = await connection.execute(

            `
            SELECT *
            FROM ${TABLE}
            WHERE order_status = 'CONFIRMED'
            ORDER BY confirmed_at ASC
            `

        );

        return rows;

    }

    static async findAssignedOrders(connection = pool) {
    
        const [rows] = await connection.execute(
        
            `
            SELECT
        
                o.*,
        
                da.id AS assignment_id,
        
                da.delivery_partner_id,
        
                da.assigned_at,
        
                da.accepted_at,
        
                da.picked_up_at,
        
                da.delivered_at,
        
                da.status AS delivery_status
        
            FROM ${TABLE} o
        
            INNER JOIN delivery_assignments da
        
                ON da.order_id = o.id
        
            WHERE o.order_status = 'ASSIGNED'
        
            ORDER BY da.assigned_at ASC
            `
        
        );
    
        return rows;
    
    }

    static async findOutForDeliveryOrders(connection = pool) {

        const [rows] = await connection.execute(

            `
            SELECT

                o.*,

                da.id AS assignment_id,

                da.delivery_partner_id,

                da.assigned_at,

                da.accepted_at,

                da.picked_up_at,

                da.delivered_at,

                da.status AS delivery_status

            FROM ${TABLE} o

            INNER JOIN delivery_assignments da

                ON da.order_id = o.id

            WHERE o.order_status = 'OUT_FOR_DELIVERY'

            ORDER BY da.picked_up_at ASC
            `

        );

        return rows;

    }

}

module.exports = OrderModel;