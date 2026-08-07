const PaymentModel = require("../../../models/payment.model");

const PAYMENT_MESSAGES = require("../../../constants/paymentMessages");

const validatePayment = async (

    paymentId,

    connection

) => {

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

    return payment;

};

module.exports = validatePayment;