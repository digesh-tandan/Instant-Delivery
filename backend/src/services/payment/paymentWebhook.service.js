const { pool } =
require("../../config/database");

const PaymentModel =
require("../../models/payment.model");

const OrderModel =
require("../../models/order.model");

const OrderStatusHistoryModel =
require("../../models/orderStatusHistory.model");

const PAYMENT_STATUS =
require("../../helpers/paymentStatus.helper");

const ORDER_STATUS =
require("../../helpers/orderStatus.helper");

const PAYMENT_MESSAGES =
require("../../constants/paymentMessages");

const UserModel =
require("../../models/user.model");

const NotificationService =
require("../../services/notification");

const verifyWebhookSignature =
require("./helpers/verifyWebhookSignature.helper");

const paymentWebhook =
async (req) => {

    const connection =
        await pool.getConnection();

    try {

        // Verify Razorpay Signature

        const signature =
            req.headers["x-razorpay-signature"];

        if (

            !signature ||

            !verifyWebhookSignature(

                req.body,

                signature

            )

        ) {

            throw new Error(

                PAYMENT_MESSAGES.INVALID_PAYMENT_SIGNATURE ||

                "Invalid webhook signature."

            );

        }

        // Convert Raw Buffer

        const payload =
            JSON.parse(

                req.body.toString()

            );

        // Event Type

        const event =
            payload.event;

        //Payment Entity

        const entity =
            payload.payload
                ?.payment
                ?.entity;

        if (!entity) {

            return {
                success: true
            };

        }

        await connection.beginTransaction();

        // Find Payment

        const payment =
            await PaymentModel.findByGatewayOrderId(

                entity.order_id,

                connection

            );

        if (!payment) {

            await connection.rollback();

            return {
                success: true
            };

        }

        // Already Paid

        if (

            payment.payment_status ===
            PAYMENT_STATUS.PAID &&

            event === "payment.captured"

        ) {
                
            await connection.commit();
        
            return {
            
                success: true,
            
                message:
                    "Payment already processed."
            
            };
        
        }

        // PAYMENT CAPTURED
        if (

            event === "payment.captured"

        ) {

            await PaymentModel.markPaid(

                payment.id,

                entity.order_id,

                entity.id,

                entity.id,

                entity,

                connection

            );

            await OrderModel.updateOrderAndPaymentStatus(

                payment.order_id,

                ORDER_STATUS.CONFIRMED,

                PAYMENT_STATUS.PAID,

                null,

                connection

            );

            await OrderStatusHistoryModel.create(

                {

                    order_id:

                        payment.order_id,

                    status:

                        ORDER_STATUS.CONFIRMED,

                    remarks:

                        "Payment confirmed via Razorpay webhook.",

                    updated_by:

                        null

                },

                connection

            );

        }

        // PAYMENT FAILED

        else if (

            event === "payment.failed"

        ) {

            await PaymentModel.markFailed(

                payment.id,

                entity.error_description ||

                "Gateway Failure",

                entity,

                connection

            );

            await OrderModel.updatePaymentStatus(

                payment.order_id,

                PAYMENT_STATUS.FAILED,

                null,

                connection

            );

            const user =
                await UserModel.findById(
                
                    payment.created_by,
                
                    connection
                
                );

        }

        await connection.commit();

        if (

            event === "payment.failed" &&
                
            user
                
        ) {
        
            await NotificationService.sendPaymentFailedEmail(
            
                user.email,
            
                user.first_name,
            
                payment.order_id,
            
                payment.amount,
            
                entity.error_description ||
            
                "Payment could not be completed."
            
            );
        
        }

        return {

            success: true

        };

    }

    catch (error) {

        await connection.rollback();

        throw error;

    }

    finally {

        connection.release();

    }

};

module.exports =
paymentWebhook;