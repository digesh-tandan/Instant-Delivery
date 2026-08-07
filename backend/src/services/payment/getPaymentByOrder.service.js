const PaymentModel =
require("../../models/payment.model");

const PAYMENT_MESSAGES =
require("../../constants/paymentMessages");

const getPaymentByOrder =
async (req) => {

    const payment =
        await PaymentModel.getPaymentByOrderWithDetails(

            req.params.orderId

        );

    if (!payment) {

        throw new Error(

            PAYMENT_MESSAGES.PAYMENT_NOT_FOUND

        );

    }

    return payment;

};

module.exports =
getPaymentByOrder;