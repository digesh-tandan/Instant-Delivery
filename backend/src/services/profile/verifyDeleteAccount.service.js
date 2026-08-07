const { pool } = require("../../config/database");

const UserModel = require("../../models/user.model");
const OTPModel = require("../../models/otp.model");
const RefreshTokenModel = require("../../models/refreshToken.model");

const NotificationService =
require("../../services/notification");

const OTP_TYPES = require("../../constants/otpTypes");

const AUTH_MESSAGES = require("../../constants/authMessages");

const verifyDeleteAccount = async (req) => {

    const connection = await pool.getConnection();

    try {

        const {

            otp

        } = req.body;

        const user = await UserModel.findById(

            req.user.id

        );

        if (!user) {

            throw new Error(

                AUTH_MESSAGES.ACCOUNT_NOT_FOUND

            );

        }

        const otpRecord = await OTPModel.findByReference(

            OTP_TYPES.DELETE_ACCOUNT,

            user.id

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

        if (

            OTPModel.isExpired(

                otpRecord.expires_at

            )

        ) {

            throw new Error(

                AUTH_MESSAGES.OTP_EXPIRED

            );

        }

        await connection.beginTransaction();

        await UserModel.softDelete(

            connection,

            user.id,

            user.id

        );

        await RefreshTokenModel.revokeAllByUserId(

            connection,

            user.id

        );

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

module.exports = verifyDeleteAccount;