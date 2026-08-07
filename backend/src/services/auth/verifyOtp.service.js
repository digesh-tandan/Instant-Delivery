const { pool } = require("../../config/database");

const UserModel = require("../../models/user.model");
const OTPModel = require("../../models/otp.model");
const PendingRegistrationModel = require("../../models/pendingRegistration.model");
const NotificationService =
require("../../services/notification");
const cleanupExpiredAuthData = require("../../helpers/cleanup.helper");

const OTP_TYPES = require("../../constants/otpTypes");
const AUTH_MESSAGES = require("../../constants/authMessages");

// Validate OTP

const validateOTP = async (
    email,
    otp
) => {

    const otpRecord = await OTPModel.findByEmailAndType(
        email,     
        OTP_TYPES.REGISTER

    );

    if (!otpRecord) {
        throw new Error(
            AUTH_MESSAGES.OTP_NOT_FOUND
        );
    }

    if (otpRecord.otp_code !== otp) {
        throw new Error(
            AUTH_MESSAGES.INVALID_OTP
        );
    }

    if (new Date() > new Date(otpRecord.expires_at)) {
        throw new Error(
            AUTH_MESSAGES.OTP_EXPIRED
        );
    }

    return otpRecord;
};


// Create User
const createUser = async (
    connection,
    pendingUser
) => {

    return await UserModel.create(
        connection,
        {
            role_id: pendingUser.role_id,
            first_name: pendingUser.first_name,
            last_name: pendingUser.last_name,
            email: pendingUser.email,
            phone: pendingUser.phone,
            password: pendingUser.password
        }
    );
};

// Delete Pending Registration
const removePendingRegistration = async (
    connection,
    id
) => {
    await PendingRegistrationModel.delete(
        connection,
        id
    );
};

// Delete OTP

const removeOTP = async (
    connection,
    id
) => {

    await OTPModel.delete(

        connection,

        id

    );

};

// Verify OTP

const verifyOTP = async (req) => {

    const connection = await pool.getConnection();

    try {

        await cleanupExpiredAuthData();

        const {

            email,

            otp

        } = req.body;

        const otpRecord = await validateOTP(

            email,

            otp

        );

        const pendingUser = await PendingRegistrationModel.findById(

            otpRecord.reference_id

        );

        if (!pendingUser) {

            throw new Error(

                AUTH_MESSAGES.ACCOUNT_NOT_FOUND

            );

        }

        await connection.beginTransaction();

        const userId = await createUser(

            connection,

            pendingUser

        );

        await removePendingRegistration(

            connection,

            pendingUser.id

        );

        await removeOTP(

            connection,

            otpRecord.id

        );

        await connection.commit();

        await NotificationService.sendWelcomeEmail(
        
            pendingUser.email,
        
            pendingUser.first_name
        
        );
        
        return {
        
            id: userId,
        
            email: pendingUser.email,
        
            first_name: pendingUser.first_name,
        
            last_name: pendingUser.last_name
        
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

module.exports = verifyOTP;