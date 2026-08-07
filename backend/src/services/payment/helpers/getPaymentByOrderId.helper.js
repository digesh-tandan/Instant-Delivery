const PaymentModel = require("../../../models/payment.model");

const getPaymentByOrderId = async (

    orderId,

    connection

) => {

    return await PaymentModel.findByOrderId(

        orderId,

        connection

    );

};

module.exports = getPaymentByOrderId;