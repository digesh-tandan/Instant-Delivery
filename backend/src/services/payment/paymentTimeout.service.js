const { pool } =
require("../../config/database");

const PaymentModel =
require("../../models/payment.model");

const OrderModel =
require("../../models/order.model");

const PAYMENT_STATUS =
require("../../helpers/paymentStatus.helper");

const PAYMENT_MESSAGES =
require("../../constants/paymentMessages");

const paymentTimeout =
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
            PAYMENT_STATUS.PENDING

        ) {

            throw new Error(

                PAYMENT_MESSAGES.INVALID_PAYMENT_STATUS

            );

        }

        await PaymentModel.markFailed(

            payment.id,

            "Payment timeout",

            {

                reason:

                    "Timeout"

            },

            connection

        );

        await OrderModel.updatePaymentStatus(

            payment.order_id,

            PAYMENT_STATUS.FAILED,

            req.user.id,

            connection

        );

        await connection.commit();

        return null;

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
paymentTimeout;