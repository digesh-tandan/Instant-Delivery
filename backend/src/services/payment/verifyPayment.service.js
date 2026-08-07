const { pool } =
require("../../config/database");

const crypto =
require("crypto");

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

const verifyPayment =
async (req) => {

    const connection =
        await pool.getConnection();

    try {

        await connection.beginTransaction();

        const {

            paymentId,

            gatewayPaymentId,

            gatewayOrderId,

            gatewaySignature,

            gatewayResponse

        } = req.body;

        const payment =
            await PaymentModel.findById(

                paymentId,

                connection

            );

        if (!payment) {

            throw new Error(

                PAYMENT_MESSAGES.PAYMENT_NOT_FOUND

            );

        }

        if (

            payment.payment_status === PAYMENT_STATUS.PAID
                
        ) {
        
            await connection.commit();

            const user =
                await UserModel.findById(
                
                    payment.created_by
                
                );
            
            if (user) {
            
                await NotificationService.sendPaymentSuccessEmail(
                
                    user.email,
                
                    user.first_name,
                
                    payment.order_id,
                
                    payment.amount,
                
                    payment.payment_method
                
                );

                await NotificationService.sendOrderConfirmedEmail(

                    user.email,
                                
                    user.first_name,
                                
                    payment.order_id
                                
                );
            
            }
        
            return {
            
                paymentId: payment.id,
            
                orderId: payment.order_id,
            
                paymentStatus: PAYMENT_STATUS.PAID,
            
                orderStatus: ORDER_STATUS.CONFIRMED,
            
                alreadyProcessed: true
            
            };
        
        }

        const expectedSignature =

        crypto

            .createHmac(

                "sha256",

                process.env.RAZORPAY_KEY_SECRET

            )

            .update(

                `${gatewayOrderId}|${gatewayPaymentId}`

            )

            .digest(

                "hex"

            );

    if (

        expectedSignature !==

        gatewaySignature

    ) {

        throw new Error(

            PAYMENT_MESSAGES.INVALID_PAYMENT_SIGNATURE ||

            "Invalid payment signature."

        );

    }

        await PaymentModel.markPaid(
                
            payment.id,
                
            gatewayOrderId,
                
            gatewayPaymentId,
                
            gatewayPaymentId,
                
            {
            
                ...gatewayResponse,
            
                gateway_signature:
            
                    gatewaySignature
            
            },
        
            connection
        
        );

        await OrderModel.updateOrderAndPaymentStatus(

            payment.order_id,

            ORDER_STATUS.CONFIRMED,

            PAYMENT_STATUS.PAID,

            req.user.id,

            connection

        );

        await OrderStatusHistoryModel.create(

            {

                order_id:

                    payment.order_id,

                status:

                    ORDER_STATUS.CONFIRMED,

                remarks:

                    "Payment verified successfully.",

                updated_by:

                    req.user.id

            },

            connection

        );

        await connection.commit();

        return {

            paymentId:

                payment.id,

            orderId:

                payment.order_id,

            paymentStatus:

                PAYMENT_STATUS.PAID,

            orderStatus:

                ORDER_STATUS.CONFIRMED

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
verifyPayment;