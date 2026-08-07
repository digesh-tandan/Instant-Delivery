const PaymentModel =
require("../../models/payment.model");

const PAYMENT_MESSAGES =
require("../../constants/paymentMessages");

const getPaymentById =
async (req) => {

    const payment =
        await PaymentModel.getPaymentByIdWithOrder(

            req.params.paymentId

        );

    if (!payment) {

        throw new Error(

            PAYMENT_MESSAGES.PAYMENT_NOT_FOUND

        );

    }

    return payment;

};

module.exports =
getPaymentById;