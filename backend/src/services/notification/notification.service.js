const brevoService =
require("./brevo.service");

const otpTemplate =
require("./templates/otp.template");

const welcomeTemplate =
require("./templates/welcome.template");

const loginAlertTemplate =
require("./templates/loginAlert.template");

const passwordChangedTemplate =
require("./templates/passwordChanged.template");

const accountActivatedTemplate =
require("./templates/accountActivated.template");

const accountSuspendedTemplate =
require("./templates/accountSuspended.template");

const accountRestoredTemplate =
require("./templates/accountRestored.template");

const accountDeletedTemplate =
require("./templates/accountDeleted.template");

const paymentSuccessTemplate =
require("./templates/paymentSuccess.template");

const paymentFailedTemplate =
require("./templates/paymentFailed.template");

const paymentRefundTemplate =
require("./templates/paymentRefund.template");

const orderPlacedTemplate =
require("./templates/orderPlaced.template");

const orderConfirmedTemplate =
require("./templates/orderConfirmed.template");

const orderPackedTemplate =
require("./templates/orderPacked.template");

const orderCancelledTemplate =
require("./templates/orderCancelled.template");

const orderReturnedTemplate =
require("./templates/orderReturned.template");

const orderAssignedTemplate =
require("./templates/orderAssigned.template");

const deliveryAcceptedTemplate =
require("./templates/deliveryAccepted.template");

const orderPickedUpTemplate =
require("./templates/orderPickedUp.template");

const outForDeliveryTemplate =
require("./templates/outForDelivery.template");

const orderDeliveredTemplate =
require("./templates/orderDelivered.template");


// Common Mail Sender

const sendMail = async (

    to,

    subject,

    html

) => {

    try {

        await brevoService.sendMail(

            to,

            subject,

            html

        );

    }

    catch (error) {

        throw new Error(

            error.message ||

            "Unable to send email."

        );

    }

};

const NotificationService = {

    // =====================================================
    // Registration OTP
    // =====================================================

    sendRegistrationOTP:

    async (

        email,

        otp

    ) => {

        await sendMail(

            email,

            "Verify Your Account",

            otpTemplate(

                "Verify Your Account",

                otp,

                "Use this OTP to verify your Instant Delivery account.",

                "This OTP is valid for 10 minutes."

            )

        );

    },

    // =====================================================
    // Forgot Password OTP
    // =====================================================

    sendForgotPasswordOTP:

    async (

        email,

        otp

    ) => {

        await sendMail(

            email,

            "Reset Your Password",

            otpTemplate(

                "Reset Password",

                otp,

                "Use this OTP to reset your password.",

                "This OTP expires in 10 minutes."

            )

        );

    },

    // =====================================================
    // Delete Account OTP
    // =====================================================

    sendDeleteAccountOTP:

    async (

        email,

        otp

    ) => {

        await sendMail(

            email,

            "Delete Account Verification",

            otpTemplate(

                "Delete Account",

                otp,

                "Use this OTP to confirm account deletion.",

                "Valid for 10 minutes."

            )

        );

    },

    // =====================================================
    // Restore Account OTP
    // =====================================================

    sendRestoreAccountOTP:

    async (

        email,

        otp

    ) => {

        await sendMail(

            email,

            "Restore Your Account",

            otpTemplate(

                "Restore Account",

                otp,

                "Use this OTP to restore your account.",

                "OTP expires in 10 minutes."

            )

        );

    },

    // =====================================================
    // Welcome Email
    // =====================================================

    sendWelcomeEmail:

    async (

        email,

        firstName

    ) => {

        await sendMail(

            email,

            "Welcome to Instant Delivery",

            welcomeTemplate(

                firstName

            )

        );

    },

    // =====================================================
    // Login Alert
    // =====================================================

    sendLoginAlertEmail:

    async (

        email,

        firstName,

        loginTime,

        ipAddress,

        device

    ) => {

        await sendMail(

            email,

            "New Login Alert",

            loginAlertTemplate(

                firstName,

                loginTime,

                ipAddress,

                device

            )

        );

    },

    // =====================================================
    // Password Changed
    // =====================================================

    sendPasswordChangedEmail:

    async (

        email

    ) => {

        await sendMail(

            email,

            "Password Changed Successfully",

            passwordChangedTemplate()

        );

    },

    // =====================================================
    // Account Activated
    // =====================================================

    sendAccountActivatedEmail:

    async (

        email,

        firstName

    ) => {

        await sendMail(

            email,

            "Account Activated",

            accountActivatedTemplate(

                firstName

            )

        );

    },

    // =====================================================
    // Account Suspended
    // =====================================================

    sendAccountSuspendedEmail:

    async (

        email,

        firstName

    ) => {

        await sendMail(

            email,

            "Account Suspended",

            accountSuspendedTemplate(

                firstName

            )

        );

    },

    // =====================================================
    // Account Restored
    // =====================================================

    sendAccountRestoredEmail:

    async (

        email

    ) => {

        await sendMail(

            email,

            "Account Restored",

            accountRestoredTemplate()

        );

    },

    // =====================================================
    // Account Deleted
    // =====================================================

    sendAccountDeletedEmail:

    async (

        email

    ) => {

        await sendMail(

            email,

            "Account Deleted",

            accountDeletedTemplate()

        );

    },
    // =====================================================
    // Payment Success
    // =====================================================

    sendPaymentSuccessEmail:

    async (

        email,

        firstName,

        orderNumber,

        amount,

        paymentMethod

    ) => {

        await sendMail(

            email,

            "Payment Successful",

            paymentSuccessTemplate(

                firstName,

                orderNumber,

                amount,

                paymentMethod

            )

        );

    },

    // =====================================================
    // Payment Failed
    // =====================================================

    sendPaymentFailedEmail:

    async (

        email,

        firstName,

        orderNumber,

        amount,

        reason

    ) => {

        await sendMail(

            email,

            "Payment Failed",

            paymentFailedTemplate(

                firstName,

                orderNumber,

                amount,

                reason

            )

        );

    },

    // =====================================================
    // Payment Refunded
    // =====================================================

    sendPaymentRefundEmail:

    async (

        email,

        firstName,

        orderNumber,

        refundAmount

    ) => {

        await sendMail(

            email,

            "Payment Refunded",

            paymentRefundTemplate(

                firstName,

                orderNumber,

                refundAmount

            )

        );

    },

    // =====================================================
    // Order Placed
    // =====================================================

    sendOrderPlacedEmail:

    async (

        email,

        firstName,

        orderNumber

    ) => {

        await sendMail(

            email,

            "Order Placed Successfully",

            orderPlacedTemplate(

                firstName,

                orderNumber

            )

        );

    },

    // =====================================================
    // Order Confirmed
    // =====================================================

    sendOrderConfirmedEmail:

    async (

        email,

        firstName,

        orderNumber

    ) => {

        await sendMail(

            email,

            "Order Confirmed",

            orderConfirmedTemplate(

                firstName,

                orderNumber

            )

        );

    },

    // =====================================================
    // Order Packed
    // =====================================================

    sendOrderPackedEmail:

    async (

        email,

        firstName,

        orderNumber

    ) => {

        await sendMail(

            email,

            "Order Packed",

            orderPackedTemplate(

                firstName,

                orderNumber

            )

        );

    },

    // =====================================================
    // Order Cancelled
    // =====================================================

    sendOrderCancelledEmail:

    async (

        email,

        firstName,

        orderNumber

    ) => {

        await sendMail(

            email,

            "Order Cancelled",

            orderCancelledTemplate(

                firstName,

                orderNumber

            )

        );

    },

    // =====================================================
    // Order Returned
    // =====================================================

    sendOrderReturnedEmail:

    async (

        email,

        firstName,

        orderNumber

    ) => {

        await sendMail(

            email,

            "Order Returned",

            orderReturnedTemplate(

                firstName,

                orderNumber

            )

        );

    },
    // =====================================================
    // Delivery Partner Assigned
    // =====================================================

    sendDeliveryPartnerAssignedEmail:

    async (

        email,

        firstName,

        orderNumber,

        partnerName

    ) => {

        await sendMail(

            email,

            "Delivery Partner Assigned",

            orderAssignedTemplate(

                firstName,

                orderNumber,

                partnerName

            )

        );

    },

    // =====================================================
    // Delivery Partner Accepted
    // =====================================================

    sendDeliveryAcceptedEmail:

    async (

        email,

        firstName,

        orderNumber,

        partnerName

    ) => {

        await sendMail(

            email,

            "Delivery Partner Accepted Your Order",

            deliveryAcceptedTemplate(

                firstName,

                orderNumber,

                partnerName

            )

        );

    },

    // =====================================================
    // Order Picked Up
    // =====================================================

    sendOrderPickedUpEmail:

    async (

        email,

        firstName,

        orderNumber

    ) => {

        await sendMail(

            email,

            "Order Picked Up",

            orderPickedUpTemplate(

                firstName,

                orderNumber

            )

        );

    },

    // =====================================================
    // Out For Delivery
    // =====================================================

    sendOutForDeliveryEmail:

    async (

        email,

        firstName,

        orderNumber

    ) => {

        await sendMail(

            email,

            "Out For Delivery",

            outForDeliveryTemplate(

                firstName,

                orderNumber

            )

        );

    },

    // =====================================================
    // Order Delivered
    // =====================================================

    sendOrderDeliveredEmail:

    async (

        email,

        firstName,

        orderNumber

    ) => {

        await sendMail(

            email,

            "Order Delivered Successfully",

            orderDeliveredTemplate(

                firstName,

                orderNumber

            )

        );

    }

};

module.exports = NotificationService;