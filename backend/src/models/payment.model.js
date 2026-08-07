const { pool } = require("../config/database");

const TABLE = "payments";

class PaymentModel {

    static async create(data, connection = pool) {

        const [result] = await connection.execute(

            `
            INSERT INTO ${TABLE}
            (
                order_id,
                payment_method,
                payment_gateway,
                transaction_id,
                gateway_order_id,
                gateway_payment_id,
                gateway_response,
                amount,
                payment_status,
                paid_at,
                created_by
            )
            VALUES
            (
                ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
            )
            `,

            [

                data.order_id,

                data.payment_method,

                data.payment_gateway ?? null,

                data.transaction_id ?? null,

                data.gateway_order_id ?? null,

                data.gateway_payment_id ?? null,

                data.gateway_response
                    ? JSON.stringify(data.gateway_response)
                    : null,

                data.amount,

                data.payment_status,

                data.paid_at ?? null,

                data.created_by ?? null

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

    static async findByOrderId(orderId, connection = pool) {

        const [rows] = await connection.execute(

            `
            SELECT *
            FROM ${TABLE}
            WHERE order_id = ?
            ORDER BY id DESC
            LIMIT 1
            `,

            [orderId]

        );

        return rows[0] || null;

    }

    static async findByGatewayOrderId(gatewayOrderId, connection = pool) {

        const [rows] = await connection.execute(

            `
            SELECT *
            FROM ${TABLE}
            WHERE gateway_order_id = ?
            LIMIT 1
            `,

            [gatewayOrderId]

        );

        return rows[0] || null;

    }

    static async findByGatewayPaymentId(gatewayPaymentId, connection = pool) {

        const [rows] = await connection.execute(

            `
            SELECT *
            FROM ${TABLE}
            WHERE gateway_payment_id = ?
            LIMIT 1
            `,

            [gatewayPaymentId]

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

    static async updateStatus(

        id,

        paymentStatus,

        updatedBy,

        connection = pool

    ) {

        await connection.execute(

            `
            UPDATE ${TABLE}
            SET
                payment_status = ?,
                updated_by = ?
            WHERE id = ?
            `,

            [

                paymentStatus,

                updatedBy,

                id

            ]

        );

    }

    static async markPaid(
    
        paymentId,
    
        gatewayOrderId,
    
        gatewayPaymentId,
    
        transactionId,
    
        gatewayResponse,
    
        connection = pool
    
    ) {
    
        await connection.execute(
        
            `
            UPDATE payments
            SET
        
                payment_status = 'PAID',
        
                gateway_order_id = ?,
        
                gateway_payment_id = ?,
        
                transaction_id = ?,
        
                gateway_response = ?,
        
                paid_at = NOW()
        
            WHERE id = ?
            `,
        
            [
            
                gatewayOrderId,
            
                gatewayPaymentId,
            
                transactionId,
            
                JSON.stringify(
                
                    gatewayResponse
                
                ),
            
                paymentId
            
            ]
        
        );
    
    }

    static async markFailed(

        paymentId,

        failureReason,

        gatewayResponse,

        connection = pool

    ) {

        await connection.execute(

            `
            UPDATE payments
            SET

                payment_status='FAILED',

                failure_reason=?,

                gateway_response=?

            WHERE id=?
            `,

            [

                failureReason,

                JSON.stringify(

                    gatewayResponse

                ),

                paymentId

            ]

        );

    }

    static async markRefunded(

        paymentId,

        refundId,

        refundAmount,

        gatewayResponse,

        connection = pool

    ) {

        await connection.execute(

            `
            UPDATE payments
            SET

                payment_status='REFUNDED',

                refund_id=?,

                refund_amount=?,

                refund_at=NOW(),

                gateway_response=?

            WHERE id=?
            `,

            [

                refundId,

                refundAmount,

                JSON.stringify(

                    gatewayResponse

                ),

                paymentId

            ]

        );

    }

    static async findPendingPayments(

        connection = pool

    ) {

        const [rows] =
            await connection.execute(

                `
                SELECT *

                FROM payments

                WHERE payment_status='PENDING'

                `

            );

        return rows;

    }

    static async findFailedPayments(

        connection = pool

    ) {

        const [rows] =
            await connection.execute(

                `
                SELECT *

                FROM payments

                WHERE payment_status='FAILED'

                `

            );

        return rows;

    }

    static async findPaidPayments(

        connection = pool

    ) {

        const [rows] =
            await connection.execute(

                `
                SELECT *

                FROM payments

                WHERE payment_status='PAID'

                `

            );

        return rows;

    }

    static async findRefundedPayments(

        connection = pool

    ) {

        const [rows] =
            await connection.execute(

                `
                SELECT *

                FROM payments

                WHERE payment_status='REFUNDED'

                `

            );

        return rows;

    }

    static async getPaymentHistory(

        orderId,

        connection = pool

    ) {

        const [rows] = await connection.execute(

            `
            SELECT *

            FROM payments

            WHERE order_id = ?

            ORDER BY created_at DESC
            `,

            [

                orderId

            ]

        );

        return rows;

    }

    static async findByTransactionId(

        transactionId,

        connection = pool

    ) {

        const [rows] = await connection.execute(

            `
            SELECT *

            FROM payments

            WHERE transaction_id = ?

            LIMIT 1
            `,

            [

                transactionId

            ]

        );

        return rows[0] || null;

    }

    static async updateGatewayOrderId(

        paymentId,

        gatewayOrderId,

        connection = pool

    ) {

        await connection.execute(

            `
            UPDATE payments

            SET gateway_order_id = ?

            WHERE id = ?
            `,

            [

                gatewayOrderId,

                paymentId

            ]

        );

    }

    static async retry(
    
        paymentId,
    
        gatewayOrderId,
    
        updatedBy,
    
        connection = pool
    
    ) {
    
        await connection.execute(
        
            `
            UPDATE payments
            SET
        
                gateway_order_id = ?,
        
                gateway_payment_id = NULL,
        
                transaction_id = NULL,
        
                gateway_response = NULL,
        
                failure_reason = NULL,
        
                payment_status = 'PENDING',
        
                paid_at = NULL,
        
                updated_by = ?,
        
                updated_at = NOW()
        
            WHERE id = ?
            `,
        
            [
            
                gatewayOrderId,
            
                updatedBy,
            
                paymentId
            
            ]
        
        );
    
    }

    static async updateTransactionId(

        paymentId,

        transactionId,

        connection = pool

    ) {

        await connection.execute(

            `
            UPDATE payments

            SET transaction_id = ?

            WHERE id = ?
            `,

            [

                transactionId,

                paymentId

            ]

        );

    }

    static async updateGatewayResponse(

        paymentId,

        gatewayResponse,

        connection = pool

    ) {

        await connection.execute(

            `
            UPDATE payments

            SET gateway_response = ?

            WHERE id = ?
            `,

            [

                JSON.stringify(

                    gatewayResponse

                ),

                paymentId

            ]

        );

    }

    static async getAllPayments(

        connection = pool

    ) {

        const [rows] = await connection.execute(

            `
            SELECT

                p.*,

                o.order_number,
                o.user_id,
                o.order_status

            FROM payments p

            INNER JOIN orders o
                ON o.id = p.order_id

            ORDER BY p.created_at DESC
            `

        );

        return rows;

    }

    static async getPaymentByIdWithOrder(

        paymentId,

        connection = pool

    ) {

        const [rows] = await connection.execute(

            `
            SELECT

                p.*,

                o.order_number,
                o.user_id,
                o.order_status,
                o.total_amount

            FROM payments p

            INNER JOIN orders o
                ON o.id = p.order_id

            WHERE p.id = ?

            LIMIT 1
            `,

            [

                paymentId

            ]

        );

        return rows[0] || null;

    }

    static async getPaymentByOrderWithDetails(

        orderId,

        connection = pool

    ) {

        const [rows] = await connection.execute(

            `
            SELECT

                p.*,

                o.order_number,
                o.user_id,
                o.order_status

            FROM payments p

            INNER JOIN orders o
                ON o.id = p.order_id

            WHERE p.order_id = ?

            ORDER BY p.created_at DESC

            LIMIT 1
            `,

            [

                orderId

            ]

        );

        return rows[0] || null;

    }

    static async getCustomerPaymentHistory(

        userId,

        connection = pool

    ) {

        const [rows] = await connection.execute(

            `
            SELECT

                p.*,

                o.order_number,
                o.order_status

            FROM payments p

            INNER JOIN orders o
                ON o.id = p.order_id

            WHERE o.user_id = ?

            ORDER BY p.created_at DESC
            `,

            [

                userId

            ]

        );

        return rows;

    }

}

module.exports = PaymentModel;