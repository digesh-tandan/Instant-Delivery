const PaymentModel = require("../../../models/payment.model");

const createPayment = async (

    paymentData,

    connection

) => {

    return await PaymentModel.create(

        paymentData,

        connection

    );

};

module.exports = createPayment;