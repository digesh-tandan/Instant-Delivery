const { pool } = require("../../config/database");

const UserModel = require("../../models/user.model");
const OTPModel = require("../../models/otp.model");

const cleanupExpiredAuthData = require("../../helpers/cleanup.helper");

const {

    generateOTP,

    generateOTPExpiry

} = require("../../helpers/otp.helper");

const NotificationService =
require("../../services/notification");

const OTP_TYPES = require("../../constants/otpTypes");

const PROFILE_MESSAGES = require("../../constants/profileMessages");

const requestDeleteAccount = async (req) => {

    const connection = await pool.getConnection();

    try {

        await cleanupExpiredAuthData();

        const user = await UserModel.findById(

            req.user.id

        );

        if (!user) {

            throw new Error(

                PROFILE_MESSAGES.PROFILE_NOT_FOUND

            );

        }

        const otp = generateOTP();

        const expiry = generateOTPExpiry();

        await connection.beginTransaction();

        await OTPModel.deleteByReference(

            connection,

            OTP_TYPES.DELETE_ACCOUNT,

            user.id

        );

        await OTPModel.create(

            connection,

            {

                reference_type:

                    OTP_TYPES.DELETE_ACCOUNT,

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

        await NotificationService.sendDeleteAccountOTP(

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

module.exports = requestDeleteAccount;