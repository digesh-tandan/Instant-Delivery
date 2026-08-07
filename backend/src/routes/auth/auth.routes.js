const createRouter = require("../../utils/routerFactory");

const router = createRouter("/api/v1/auth");

const {registerRoute} = require("../../utils/routeRegistry");

const authController = require("../../controllers/auth/auth.controller");

const validate = require("../../middleware/validation.middleware");

const {

    registerValidation,

    verifyOtpValidation,

    resendOtpValidation,

    loginValidation,

    forgotPasswordValidation,

    resetPasswordValidation,

    restoreAccountValidation,

    verifyRestoreAccountValidation

} = require("../../validations/auth");

const authenticate = require("../../middleware/auth.middleware");

// Public Routes
// Register

router.post(

    "/register",

    validate(registerValidation),

    authController.register

);

// Verify OTP

router.post(

    "/verify-otp",

    validate(verifyOtpValidation),

    authController.verifyOTP

);

// Resend OTP

router.post(

    "/resend-otp",

    validate(resendOtpValidation),

    authController.resendOTP

);

// Restore Account (Send OTP)

router.post(

    "/restore-account",

    validate(restoreAccountValidation),

    authController.restoreAccount

);

// Verify Restore Account OTP

router.post(

    "/restore-account/verify-otp",

    validate(verifyRestoreAccountValidation),

    authController.verifyRestoreAccount

);

// Login

router.post(

    "/login",

    validate(loginValidation),

    authController.login

);

// Refresh Token

router.post(
    "/refresh-token",
    authController.refreshToken
);

// Forgot Password

router.post(

    "/forgot-password",

    validate(forgotPasswordValidation),

    authController.forgotPassword

);

// Reset Password

router.post(

    "/reset-password",

    validate(resetPasswordValidation),

    authController.resetPassword

);

// Protected Routes
// Logout

router.post(
    "/logout",
    authenticate,
    authController.logout
);

module.exports = router;