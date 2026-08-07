const {

    executeService

} = require("../../utils/executeService");

const PaymentService =
require("../../services/payment/payment.service");

const statusCodes =
require("../../constants/statusCodes");

const PAYMENT_MESSAGES =
require("../../constants/paymentMessages");

// Create Payment

exports.createPayment = executeService(

    PaymentService.createPayment,

    statusCodes.CREATED,

    PAYMENT_MESSAGES.PAYMENT_CREATED

);

// Verify Payment

exports.verifyPayment = executeService(

    PaymentService.verifyPayment,

    statusCodes.OK,

    PAYMENT_MESSAGES.PAYMENT_VERIFIED

);

// Payment Webhook

exports.paymentWebhook = executeService(

    PaymentService.paymentWebhook,

    statusCodes.OK,

    PAYMENT_MESSAGES.PAYMENT_VERIFIED

);

// Refund Payment

exports.refundPayment = executeService(

    PaymentService.refundPayment,

    statusCodes.OK,

    PAYMENT_MESSAGES.PAYMENT_REFUNDED

);

// Retry Payment

exports.retryPayment = executeService(

    PaymentService.retryPayment,

    statusCodes.OK,

    PAYMENT_MESSAGES.PAYMENT_RETRY_REQUIRED

);

// Payment Timeout

exports.paymentTimeout = executeService(

    PaymentService.paymentTimeout,

    statusCodes.OK,

    PAYMENT_MESSAGES.PAYMENT_TIMEOUT

);

// Get Payment By Order

exports.getPaymentByOrder = executeService(

    PaymentService.getPaymentByOrder,

    statusCodes.OK,

    PAYMENT_MESSAGES.PAYMENT_FETCHED

);

// Get Payment History

exports.getPaymentHistory = executeService(

    PaymentService.getPaymentHistory,

    statusCodes.OK,

    PAYMENT_MESSAGES.PAYMENT_HISTORY_FETCHED

);

// Get All Payments

exports.getAllPayments = executeService(

    PaymentService.getAllPayments,

    statusCodes.OK,

    PAYMENT_MESSAGES.PAYMENTS_FETCHED

);

// Get Payment By Id

exports.getPaymentById = executeService(

    PaymentService.getPaymentById,

    statusCodes.OK,

    PAYMENT_MESSAGES.PAYMENT_FETCHED

);