const { pool } = require("../../config/database");

const UserModel = require("../../models/user.model");
const OTPModel = require("../../models/otp.model");
const RefreshTokenModel = require("../../models/refreshToken.model");

const cleanupExpiredAuthData = require("../../helpers/cleanup.helper");

const NotificationService =
require("../../services/notification");

const OTP_TYPES = require("../../constants/otpTypes");

const AUTH_MESSAGES = require("../../constants/authMessages");

// Validate OTP

const validateOTP = async (

    email,

    otp

) => {

    const otpRecord = await OTPModel.findByEmailAndType(

        email,

        OTP_TYPES.DELETE_ACCOUNT

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


// Verify Delete Account OTP

const verifyDeleteAccountOTP = async (

    req

) => {

    const connection =
        await pool.getConnection();

    try {

        await cleanupExpiredAuthData();

        const {

            otp

        } = req.body;

        const userId =
            req.user.id;

        const user =
            await UserModel.findById(

                userId

            );

        if (!user) {

            throw new Error(

                AUTH_MESSAGES.ACCOUNT_NOT_FOUND

            );

        }

        const otpRecord =
            await validateOTP(

                user.email,

                otp

            );

        await connection.beginTransaction();

        // Soft Delete User

        await UserModel.softDelete(

            connection,

            user.id,

            user.id

        );

        // Logout All Devices

        await RefreshTokenModel.revokeAllByUserId(

            connection,

            user.id

        );

        // Delete OTP

        await OTPModel.delete(

            connection,

            otpRecord.id

        );

        await connection.commit();

        await NotificationService.sendAccountDeletedEmail(

            user.email,

            user.first_name

        );

        return {

            email: user.email

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

module.exports = verifyDeleteAccountOTP;