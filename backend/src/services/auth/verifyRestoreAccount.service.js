const { pool } = require("../../config/database");

const UserModel = require("../../models/user.model");

const OTPModel = require("../../models/otp.model");

const NotificationService =
require("../../services/notification");

const OTP_TYPES = require("../../constants/otpTypes");

const AUTH_MESSAGES = require("../../constants/authMessages");

const verifyRestoreAccount = async (req) => {

    const connection = await pool.getConnection();

    try {

        const {

            email,

            otp

        } = req.body;

        const user = await UserModel.findByEmail(

            email

        );

        if (!user) {

            throw new Error(

                AUTH_MESSAGES.ACCOUNT_NOT_FOUND

            );

        }

        const otpRecord = await OTPModel.findByReference(

            OTP_TYPES.RESTORE_ACCOUNT,

            user.id

        );

        if (!otpRecord) {

            throw new Error(

                AUTH_MESSAGES.OTP_NOT_FOUND

            );

        }

        if (

            otpRecord.otp_code !== otp

        ) {

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

        await UserModel.restoreAccount(

            connection,

            user.id

        );

        await OTPModel.delete(

            connection,

            otpRecord.id

        );

        await connection.commit();

        await NotificationService.sendAccountRestoredEmail(

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

module.exports = verifyRestoreAccount;