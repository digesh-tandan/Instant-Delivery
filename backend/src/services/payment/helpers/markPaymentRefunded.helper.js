const PaymentModel = require("../../../models/payment.model");

const markPaymentRefunded = async (

    paymentId,

    refundReference,

    gatewayResponse,

    updatedBy,

    connection

) => {

    await PaymentModel.markRefunded(

        paymentId,

        refundReference,

        gatewayResponse,

        updatedBy,

        connection

    );

};

module.exports = markPaymentRefunded;