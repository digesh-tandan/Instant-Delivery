const {

    executeService

} = require("../../utils/executeService");

const AuthService = require("../../services/auth/auth.service");

const statusCodes = require("../../constants/statusCodes");

const AUTH_MESSAGES = require("../../constants/authMessages");

const {

    successResponse

} = require("../../helpers/response.helper");

// Register

exports.register = executeService(

    AuthService.register,

    statusCodes.CREATED,

    AUTH_MESSAGES.REGISTRATION_SUCCESS

);

// Verify OTP

exports.verifyOTP = executeService(

    AuthService.verifyOTP,

    statusCodes.OK,

    AUTH_MESSAGES.ACCOUNT_CREATED

);

// Resend OTP

exports.resendOTP = executeService(

    AuthService.resendOTP,

    statusCodes.OK,

    AUTH_MESSAGES.OTP_RESENT

);

// Login

exports.login = executeService(

    AuthService.login,

    statusCodes.OK,

    AUTH_MESSAGES.REFRESH_TOKEN_SUCCESS

);

// Logout

exports.logout = executeService(

    AuthService.logout,

    statusCodes.OK,

    AUTH_MESSAGES.LOGOUT_SUCCESS

);

// Refresh Token

exports.refreshToken = executeService(

    AuthService.refreshToken,

    statusCodes.OK,

    AUTH_MESSAGES.REFRESH_TOKEN_SUCCESS

);

// Forgot Password

exports.forgotPassword = executeService(

    AuthService.forgotPassword,

    statusCodes.OK,

    AUTH_MESSAGES.OTP_SENT

);

// Reset Password

exports.resetPassword = executeService(

    AuthService.resetPassword,

    statusCodes.OK,

    AUTH_MESSAGES.PASSWORD_RESET

);

// Restore Account

exports.restoreAccount = executeService(

    AuthService.restoreAccount,

    statusCodes.OK,

    AUTH_MESSAGES.ACCOUNT_RESTORE_OTP_SENT

);

// Verify Restore Account

exports.verifyRestoreAccount = executeService(

    AuthService.verifyRestoreAccount,

    statusCodes.OK,

    AUTH_MESSAGES.ACCOUNT_RESTORED

);