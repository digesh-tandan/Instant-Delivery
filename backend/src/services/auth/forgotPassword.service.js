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

const AUTH_MESSAGES = require("../../constants/authMessages");


// Find User

const findUser = async (email) => {

    const user = await UserModel.findByEmail(email);

    if (!user) {

        throw new Error(

            AUTH_MESSAGES.ACCOUNT_NOT_FOUND

        );

    }

    return user;

};


// Create OTP

const createOTP = async (

    connection,

    user

) => {

    const otp = generateOTP();

    const expiry = generateOTPExpiry();

    await OTPModel.deleteByReference(

        connection,

        OTP_TYPES.FORGOT_PASSWORD,

        user.id

    );

    await OTPModel.create(

        connection,

        {

            reference_type:

                OTP_TYPES.FORGOT_PASSWORD,

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

    return {

        otp,

        expiry

    };

};


// Forgot Password

const forgotPassword = async (req) => {

    const connection = await pool.getConnection();

    try {

        await cleanupExpiredAuthData();

        const {

            email

        } = req.body;

        const user = await findUser(

            email

        );

        await connection.beginTransaction();

        const {

            otp,

            expiry

        } = await createOTP(

            connection,

            user

        );

        await connection.commit();

        await NotificationService.sendForgotPasswordOTP(

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

module.exports = forgotPassword;