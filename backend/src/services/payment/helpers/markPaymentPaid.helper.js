const PaymentModel = require("../../../models/payment.model");

const markPaymentPaid = async (

    paymentId,

    gatewayPaymentId,

    gatewaySignature,

    transactionReference,

    gatewayResponse,

    updatedBy,

    connection

) => {

    await PaymentModel.markPaid(

        paymentId,

        gatewayPaymentId,

        gatewaySignature,

        transactionReference,

        gatewayResponse,

        updatedBy,

        connection

    );

};

module.exports = markPaymentPaid;