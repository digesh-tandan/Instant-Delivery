const { pool } =
require("../../config/database");

const razorpay =
require("../../config/razorpay");

const PaymentModel =
require("../../models/payment.model");

const OrderModel =
require("../../models/order.model");

const OrderItemModel =
require("../../models/orderItem.model");

const VariantModel =
require("../../models/variant.model");

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

const refundPayment =
async (req) => {

    const connection =
        await pool.getConnection();

    try {

        await connection.beginTransaction();

        const {

            paymentId

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

            payment.payment_status !==
            PAYMENT_STATUS.PAID

        ) {

            throw new Error(

                PAYMENT_MESSAGES.INVALID_PAYMENT_STATUS

            );

        }

        const refund =

            await razorpay.payments.refund(

                payment.gateway_payment_id,

                {

                    amount:

                        Math.round(

                            payment.amount * 100

                        )

                }

            );

        await PaymentModel.markRefunded(

            payment.id,

            refund.id,

            refund.amount / 100,

            refund,

            connection

        );

        await OrderModel.updateOrderAndPaymentStatus(

            payment.order_id,

            ORDER_STATUS.RETURNED,

            PAYMENT_STATUS.REFUNDED,

            req.user.id,

            connection

        );

        await OrderStatusHistoryModel.create(

            {

                order_id:

                    payment.order_id,

                status:

                    ORDER_STATUS.RETURNED,

                remarks:

                    "Order returned and payment refunded successfully.",

                updated_by:

                    req.user.id

            },

            connection

        );

        const items =
            await OrderItemModel.getByOrderId(

                payment.order_id,

                connection

            );

        for (

            const item

            of items

        ) {

            await VariantModel.increaseStock(

                connection,

                item.variant_id,

                item.quantity

            );

        }

        const user =
            await UserModel.findById(
            
                payment.created_by,
            
                connection
            
            );

        await connection.commit();

        if (user) {

            await NotificationService.sendPaymentRefundEmail(
            
                user.email,
            
                user.first_name,
            
                payment.order_id,
            
                refund.amount / 100,
            
                refund.id
            
            );
        
        }

        return {

            paymentId:

                payment.id,

            orderId:

                payment.order_id,

            refundId:

                refund.id,

            refundAmount:

                refund.amount / 100,

            refundStatus:

                refund.status,

            paymentStatus:

                PAYMENT_STATUS.REFUNDED

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
refundPayment;