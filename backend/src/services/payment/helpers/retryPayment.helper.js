const PaymentModel =
require("../../../models/payment.model");

const retryPayment = async (

    paymentId,

    gatewayOrderId,

    updatedBy,

    connection

) => {

    await PaymentModel.retry(

        paymentId,

        gatewayOrderId,

        updatedBy,

        connection

    );

};

module.exports =
retryPayment;