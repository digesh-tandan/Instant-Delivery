const PaymentModel = require("../../../models/payment.model");

const updatePaymentStatus = async (

    paymentId,

    paymentStatus,

    updatedBy,

    connection

) => {

    await PaymentModel.updateStatus(

        paymentId,

        paymentStatus,

        updatedBy,

        connection

    );

};

module.exports = updatePaymentStatus;