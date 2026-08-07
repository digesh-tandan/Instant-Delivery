const { pool } =
require("../../config/database");

const razorpay =
require("../../config/razorpay");

const OrderModel =
require("../../models/order.model");

const PaymentModel =
require("../../models/payment.model");

const PAYMENT_STATUS =
require("../../helpers/paymentStatus.helper");

const PAYMENT_MESSAGES =
require("../../constants/paymentMessages");

const retryPayment =
async (req) => {

    const connection =
        await pool.getConnection();

    try {

        await connection.beginTransaction();

        const {

            orderId

        } = req.body;

        const order =
            await OrderModel.findByIdForUpdate(

                orderId,

                connection

            );

        if (!order) {

            throw new Error(

                "Order not found."

            );

        }

        const payment =
            await PaymentModel.findByOrderId(

                order.id,

                connection

            );

        if (!payment) {

            throw new Error(

                PAYMENT_MESSAGES.PAYMENT_NOT_FOUND

            );

        }

        if (

            ![

                PAYMENT_STATUS.PENDING,

                PAYMENT_STATUS.FAILED

            ].includes(

                payment.payment_status

            )

        ) {

            throw new Error(

                PAYMENT_MESSAGES.INVALID_PAYMENT_STATUS

            );

        }

        const razorpayOrder =
            await razorpay.orders.create({

                amount:

                    Math.round(

                        payment.amount * 100

                    ),

                currency:

                    "INR",

                receipt:

                    order.order_number,

                notes: {

                    orderId:

                        order.id,

                    retry:

                        true

                }

            });

        await PaymentModel.retry(

            payment.id,

            razorpayOrder.id,

            req.user.id,

            connection

        );

        await connection.commit();

        return {

            paymentId:

                payment.id,

            orderId:

                order.id,

            amount:

                payment.amount,

            amountInPaise:

                razorpayOrder.amount,

            currency:

                razorpayOrder.currency,

            razorpayOrderId:

                razorpayOrder.id,

            key:

                process.env.RAZORPAY_KEY_ID,

            paymentStatus:

                PAYMENT_STATUS.PENDING

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
retryPayment;