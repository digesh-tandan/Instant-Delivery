module.exports = {

    createPayment: require("./createPayment.service"),

    verifyPayment: require("./verifyPayment.service"),

    paymentWebhook: require("./paymentWebhook.service"),

    refundPayment: require("./refundPayment.service"),

    retryPayment: require("./retryPayment.service"),

    paymentTimeout: require("./paymentTimeout.service"),

    getPaymentByOrder: require("./getPaymentByOrder.service"),

    getPaymentHistory: require("./getPaymentHistory.service"),

    getAllPayments: require("./getAllPayments.service"),

    getPaymentById: require("./getPaymentById.service")
};