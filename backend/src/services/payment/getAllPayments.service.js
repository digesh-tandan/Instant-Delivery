const PaymentModel =
require("../../models/payment.model");

const getAllPayments =
async () => {

    return await PaymentModel.getAllPayments();

};

module.exports =
getAllPayments;