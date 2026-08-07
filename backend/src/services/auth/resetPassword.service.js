const { pool } = require("../../config/database");

const UserModel = require("../../models/user.model");
const OTPModel = require("../../models/otp.model");
const RefreshTokenModel = require("../../models/refreshToken.model");

const {
    hashPassword
} = require("../../helpers/password.helper");

const NotificationService =
require("../../services/notification");

const OTP_TYPES = require("../../constants/otpTypes");
const AUTH_MESSAGES = require("../../constants/authMessages");

// Validate Reset Request

const validateResetRequest = async (

    email,

    otp

) => {

    const otpRecord = await OTPModel.findByEmailAndType(

        email,

        OTP_TYPES.FORGOT_PASSWORD

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

    const user = await UserModel.findByEmail(

        email

    );

    if (!user) {

        throw new Error(

            AUTH_MESSAGES.ACCOUNT_NOT_FOUND

        );

    }

    return {

        user,

        otpRecord

    };

};

// Update Password

const updatePassword = async (

    connection,

    user,

    newPassword

) => {

    const hashedPassword =
        await hashPassword(

            newPassword

        );

    await UserModel.updatePassword(

        connection,

        user.id,

        hashedPassword

    );

};


// Reset Password

const resetPassword = async (req) => {

    const connection =
        await pool.getConnection();

    try {

        const {

            email,

            otp,

            new_password

        } = req.body;

        const {

            user,

            otpRecord

        } = await validateResetRequest(

            email,

            otp

        );

        await connection.beginTransaction();

        await updatePassword(

            connection,

            user,

            new_password

        );

        await OTPModel.delete(

            connection,

            otpRecord.id

        );

        await RefreshTokenModel.revokeAllByUserId(

            connection,

            user.id

        );

        await connection.commit();

        await NotificationService.sendPasswordChangedEmail(

            user.email

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

module.exports = resetPassword;