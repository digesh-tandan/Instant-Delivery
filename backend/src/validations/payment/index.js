module.exports = {

    createPaymentValidation: require("./createPayment.validation"),

    verifyPaymentValidation: require("./verifyPayment.validation"),

    retryPaymentValidation: require("./retryPayment.validation"),

    refundPaymentValidation: require("./refundPayment.validation"),

    paymentTimeoutValidation: require("./paymentTimeout.validation"),

    getPaymentByOrderValidation: require("./getPaymentByOrder.validation"),

    getPaymentHistoryValidation: require("./getPaymentHistory.validation"),

    getAllPaymentsValidation: require("./getAllPayments.validation"),

    getPaymentByIdValidation: require("./getPaymentById.validation")
};