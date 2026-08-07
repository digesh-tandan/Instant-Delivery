const { pool } = require("../../config/database");

const UserModel = require("../../models/user.model");
const OTPModel = require("../../models/otp.model");

const {
    comparePassword
} = require("../../helpers/password.helper");

const {
    generateOTP,
    generateOTPExpiry
} = require("../../helpers/otp.helper");

const NotificationService =
require("../../services/notification");

const cleanupExpiredAuthData = require("../../helpers/cleanup.helper");

const OTP_TYPES = require("../../constants/otpTypes");
const AUTH_MESSAGES = require("../../constants/authMessages");

// Validate User

const validateUser = async (

    userId,

    password

) => {

    const user = await UserModel.findById(userId);

    if (!user) {

        throw new Error(

            AUTH_MESSAGES.ACCOUNT_NOT_FOUND

        );

    }

    const isPasswordCorrect =
        await comparePassword(

            password,

            user.password

        );

    if (!isPasswordCorrect) {

        throw new Error(

            AUTH_MESSAGES.CURRENT_PASSWORD_INCORRECT

        );

    }

    return user;

};

// Generate Delete OTP

const generateDeleteOTP = async (

    connection,

    user

) => {

    const otp = generateOTP();

    const expiry = generateOTPExpiry();

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

    return {

        otp,

        expiry

    };

};

// Delete Account Request

const deleteAccount = async (req) => {

    const connection =
        await pool.getConnection();

    try {

        await cleanupExpiredAuthData();

        const userId =
            req.user.id;

        const {

            password

        } = req.body;

        const user =
            await validateUser(

                userId,

                password

            );

        await connection.beginTransaction();

        const {

            otp,

            expiry

        } = await generateDeleteOTP(

            connection,

            user

        );

        await connection.commit();

        await NotificationService.sendDeleteAccountOTP(

            user.email,

            otp

        );

        return {

            email:
                user.email,

            expires_at:
                expiry

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

module.exports = deleteAccount;