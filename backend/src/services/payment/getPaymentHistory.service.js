const PaymentModel =
require("../../models/payment.model");

const getPaymentHistory =
async (req) => {

    return await PaymentModel.getCustomerPaymentHistory(

        req.user.id

    );

};

module.exports =
getPaymentHistory;