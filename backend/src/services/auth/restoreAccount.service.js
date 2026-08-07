const { pool } = require("../../config/database");

const UserModel = require("../../models/user.model");
const OTPModel = require("../../models/otp.model");

const cleanupExpiredAuthData = require("../../helpers/cleanup.helper");

const {

    comparePassword

} = require("../../helpers/password.helper");

const {

    generateOTP,

    generateOTPExpiry

} = require("../../helpers/otp.helper");

const NotificationService =
require("../../services/notification");

const OTP_TYPES = require("../../constants/otpTypes");

const AUTH_MESSAGES = require("../../constants/authMessages");

const restoreAccount = async (req) => {

    const connection = await pool.getConnection();

    try {

        await cleanupExpiredAuthData();

        const {

            email,

            password

        } = req.body;

        const user = await UserModel.findByEmail(

            email

        );

        if (!user) {

            throw new Error(

                AUTH_MESSAGES.INVALID_EMAIL

            );

        }

        const passwordMatched = await comparePassword(

            password,

            user.password

        );

        if (!passwordMatched) {

            throw new Error(

                AUTH_MESSAGES.INCORRECT_PASSWORD

            );

        }

        if (user.is_active) {

            throw new Error(

                AUTH_MESSAGES.ACCOUNT_ALREADY_ACTIVE

            );

        }

        if (

            !user.scheduled_deletion_at ||

            new Date() >

            new Date(user.scheduled_deletion_at)

        ) {

            throw new Error(

                AUTH_MESSAGES.RESTORE_PERIOD_EXPIRED

            );

        }

        const otp = generateOTP();

        const expiry = generateOTPExpiry();

        await connection.beginTransaction();

        await OTPModel.deleteByReference(

            connection,

            OTP_TYPES.RESTORE_ACCOUNT,

            user.id

        );

        await OTPModel.create(

            connection,

            {

                reference_type:

                    OTP_TYPES.RESTORE_ACCOUNT,

                reference_id:

                    user.id,

                email:

                    user.email,

                otp_code:

                    otp,

                expires_at:

                    expiry

            }

        );

        await connection.commit();

        await NotificationService.sendRestoreAccountOTP(

            user.email,

            otp

        );

        return {

            email: user.email,

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

module.exports = restoreAccount;