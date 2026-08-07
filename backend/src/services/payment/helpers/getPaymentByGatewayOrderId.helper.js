const PaymentModel = require("../../../models/payment.model");

const getPaymentByGatewayOrderId = async (

    gatewayOrderId,

    connection

) => {

    return await PaymentModel.findByGatewayOrderId(

        gatewayOrderId,

        connection

    );

};

module.exports = getPaymentByGatewayOrderId;