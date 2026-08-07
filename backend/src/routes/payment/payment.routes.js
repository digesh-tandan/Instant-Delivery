const createRouter = require("../../utils/routerFactory");

const router = createRouter("/api/v1/pay");

const PaymentController =
require("../../controllers/payment/payment.controller");

const authenticate =
require("../../middleware/auth.middleware");

const authorize =
require("../../middleware/role.middleware");

const validate =
require("../../middleware/validation.middleware");

const {

    createPaymentValidation,

    verifyPaymentValidation,

    refundPaymentValidation,

    retryPaymentValidation,

    paymentTimeoutValidation,

    getPaymentByOrderValidation,

    getPaymentHistoryValidation,

    getAllPaymentsValidation,

    getPaymentByIdValidation

} = require("../../validations/payment");

// CUSTOMER

// Create Payment

router.post(

    "/create",

    authenticate,

    authorize(2),

    validate(createPaymentValidation),

    PaymentController.createPayment

);

// Verify Payment

router.post(

    "/verify",

    authenticate,

    authorize(2),

    validate(verifyPaymentValidation),

    PaymentController.verifyPayment

);

// Retry Payment

router.post(

    "/retry",

    authenticate,

    authorize(2),

    validate(retryPaymentValidation),

    PaymentController.retryPayment

);

// Payment Details

router.get(

    "/order/:orderId",

    authenticate,

    authorize(1, 2),

    validate(getPaymentByOrderValidation),

    PaymentController.getPaymentByOrder

);

// Payment History

router.get(

    "/history",

    authenticate,

    authorize(2),

    validate(getPaymentHistoryValidation),

    PaymentController.getPaymentHistory

);


// ADMIN

// Refund Payment

router.post(

    "/refund",

    authenticate,

    authorize(1,4),

    validate(refundPaymentValidation),

    PaymentController.refundPayment

);

// Payment Timeout

router.post(

    "/timeout",

    authenticate,

    authorize(1),

    validate(paymentTimeoutValidation),

    PaymentController.paymentTimeout

);

// Get All Payments

router.get(

    "/all",

    authenticate,

    authorize(1),

    validate(getAllPaymentsValidation),

    PaymentController.getAllPayments

);

// Payment Gateway Webhook

router.post(

    "/webhook",

    PaymentController.paymentWebhook

);

// Get Payment By ID

router.get(

    "/:paymentId",

    authenticate,

    authorize(1),

    validate(getPaymentByIdValidation),

    PaymentController.getPaymentById

);


module.exports = router;