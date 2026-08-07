const { pool } =
require("../../config/database");

const OrderModel =
require("../../models/order.model");

const PaymentModel =
require("../../models/payment.model");

const PAYMENT_STATUS =
require("../../helpers/paymentStatus.helper");

const ORDER_MESSAGES =
require("../../constants/orderMessages");

const PAYMENT_MESSAGES =
require("../../constants/paymentMessages");

const razorpay =
require("../../config/razorpay");

const createPayment =
async (req) => {

    const connection =
        await pool.getConnection();

    try {

        await connection.beginTransaction();

        const {

            orderId,

            paymentMethod,

            paymentGateway

        } = req.body;

        const order =
            await OrderModel.findByIdForUpdate(

                orderId,

                connection

            );

        if (!order) {

            throw new Error(

                ORDER_MESSAGES.ORDER_NOT_FOUND

            );

        }

        if (!paymentMethod) {

            throw new Error(

                PAYMENT_MESSAGES.INVALID_PAYMENT_REQUEST

            );

        }

        if (!paymentGateway) {

            throw new Error(

                PAYMENT_MESSAGES.PAYMENT_GATEWAY_ERROR

            );

        }

        // Check latest payment for this order

        const existingPayment =
            await PaymentModel.findByOrderId(

                order.id,

                connection

            );

        // Payment already completed

        if (

            existingPayment &&

            existingPayment.payment_status ===
            PAYMENT_STATUS.PAID

        ) {

            throw new Error(

                PAYMENT_MESSAGES.ORDER_ALREADY_PAID

            );

        }

        // Existing pending payment
        // Return same Razorpay Order

        if (

            existingPayment &&

            existingPayment.payment_status ===
            PAYMENT_STATUS.PENDING

        ) {

            await connection.commit();

            return {

                paymentId:

                    existingPayment.id,

                orderId:

                    order.id,

                amount:

                    Number(order.total_amount),

                amountInPaise:

                    Math.round(

                        Number(order.total_amount) * 100

                    ),

                currency:

                    "INR",

                razorpayOrderId:

                    existingPayment.gateway_order_id,

                key:

                    process.env.RAZORPAY_KEY_ID,

                paymentStatus:

                    existingPayment.payment_status

            };

        }

        // If FAILED or no previous payment,
        // Create a new Razorpay Order

        const razorpayOrder =
            await razorpay.orders.create({

                amount:

                    Math.round(

                        Number(order.total_amount) * 100

                    ),

                currency:

                    "INR",

                receipt:

                    order.order_number,

                notes: {

                    orderId:

                        order.id

                }

            });

        const paymentId =
            await PaymentModel.create(

                {

                    order_id:

                        order.id,

                    payment_method:

                        paymentMethod,

                    payment_gateway:

                        paymentGateway,

                    gateway_order_id:

                        razorpayOrder.id,

                    amount:

                        Number(order.total_amount),

                    payment_status:

                        PAYMENT_STATUS.PENDING,

                    created_by:

                        req.user.id

                },

                connection

            );

        await connection.commit();

        return {

            paymentId,

            orderId:

                order.id,

            amount:

                Number(order.total_amount),

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
createPayment;