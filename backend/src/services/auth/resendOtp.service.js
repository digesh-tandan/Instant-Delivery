const { pool } = require("../../config/database");

const PendingRegistrationModel = require("../../models/pendingRegistration.model");
const OTPModel = require("../../models/otp.model");

const cleanupExpiredAuthData = require("../../helpers/cleanup.helper");

const {
    generateOTP,
    generateOTPExpiry
} = require("../../helpers/otp.helper");

const NotificationService =
require("../../services/notification");

const OTP_TYPES = require("../../constants/otpTypes");
const AUTH_MESSAGES = require("../../constants/authMessages");

// Find Pending Registration

const findPendingRegistration = async (email) => {

    const pendingUser =
        await PendingRegistrationModel.findByEmail(email);

    if (!pendingUser) {

        throw new Error(
            AUTH_MESSAGES.ACCOUNT_NOT_FOUND
        );

    }

    return pendingUser;

};

// Save New OTP

const saveNewOTP = async (

    connection,

    pendingUser

) => {

    const otp = generateOTP();

    const expiry = generateOTPExpiry();

    await OTPModel.deleteByReference(

        connection,

        OTP_TYPES.REGISTER,

        pendingUser.id

    );

    await OTPModel.create(

        connection,

        {

            reference_type: OTP_TYPES.REGISTER,

            reference_id: pendingUser.id,

            email: pendingUser.email,

            otp_code: otp,

            expires_at: expiry

        }

    );

    return {

        otp,

        expiry

    };

};

// Send OTP

const sendOTP = async (

    email,

    otp

) => {

    await NotificationService.sendRegistrationOTP(

        email,

        otp

    );

};

// Resend OTP

const resendOTP = async (req) => {

    const connection =
        await pool.getConnection();

    try {

        await cleanupExpiredAuthData();

        const {

            email

        } = req.body;

        const pendingUser =
            await findPendingRegistration(

                email

            );

        await connection.beginTransaction();

        const {

            otp,

            expiry

        } = await saveNewOTP(

            connection,

            pendingUser

        );

        await connection.commit();

        await NotificationService.sendRegistrationOTP(
                
            email,
                
            otp
                
        );

        return {

            email,

            expires_at: expiry

        };

    }

    catch (error) {

        await connection.rollback();

        throw error;

    }

    finally {

        connection.release();

    }

};

module.exports = resendOTP;