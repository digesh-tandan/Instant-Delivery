const PaymentModel = require("../../../models/payment.model");

const getPaymentByGatewayPaymentId = async (

    gatewayPaymentId,

    connection

) => {

    return await PaymentModel.findByGatewayPaymentId(

        gatewayPaymentId,

        connection

    );

};

module.exports = getPaymentByGatewayPaymentId;