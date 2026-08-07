const PaymentModel = require("../../../models/payment.model");

const markPaymentFailed = async (

    paymentId,

    gatewayResponse,

    updatedBy,

    connection

) => {

    await PaymentModel.markFailed(

        paymentId,

        gatewayResponse,

        updatedBy,

        connection

    );

};

module.exports = markPaymentFailed;