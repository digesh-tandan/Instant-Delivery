const { pool } = require("../../config/database");

const UserModel = require("../../models/user.model");
const PendingRegistrationModel = require("../../models/pendingRegistration.model");
const OTPModel = require("../../models/otp.model");

const cleanupExpiredAuthData = require("../../helpers/cleanup.helper");

const { hashPassword } = require("../../helpers/password.helper");

const {
    generateOTP,
    generateOTPExpiry
} = require("../../helpers/otp.helper");

const NotificationService =
require("../../services/notification");

const OTP_TYPES = require("../../constants/otpTypes");
const ROLES = require("../../constants/roles");
const AUTH_MESSAGES = require("../../constants/authMessages");

// Validate registration request

const validateRegistration = async (

    email,

    phone

) => {

    const existingEmail =
        await UserModel.findByEmail(email);

    if (existingEmail) {

        throw new Error(
            AUTH_MESSAGES.EMAIL_ALREADY_EXISTS
        );

    }

    const existingPhone =
        await UserModel.findByPhone(phone);

    if (existingPhone) {

        throw new Error(
            AUTH_MESSAGES.PHONE_ALREADY_EXISTS
        );

    }

    const pendingEmail =
        await PendingRegistrationModel.findByEmail(email);

    if (pendingEmail) {

        throw new Error(
            AUTH_MESSAGES.PENDING_EMAIL_VERIFICATION
        );

    }

    const pendingPhone =
        await PendingRegistrationModel.findByPhone(phone);

    if (pendingPhone) {

        throw new Error(
            AUTH_MESSAGES.PENDING_PHONE_VERIFICATION
        );

    }

};


// Save pending registration

const createPendingRegistration = async (

    connection,

    user,

    expiry

) => {

    return await PendingRegistrationModel.create(

        connection,

        {

            role_id: ROLES.CUSTOMER,

            first_name: user.first_name,

            last_name: user.last_name,

            email: user.email,

            phone: user.phone,

            password: user.password,

            expires_at: expiry

        }

    );

};


// Generate and save OTP

const generateAndSaveOTP = async (

    connection,

    pendingId,

    email,

    expiry

) => {

    const otp = generateOTP();

    await OTPModel.deleteByReference(

        connection,

        OTP_TYPES.REGISTER,

        pendingId

    );

    await OTPModel.create(

        connection,

        {

            reference_type: OTP_TYPES.REGISTER,

            reference_id: pendingId,

            email,

            otp_code: otp,

            expires_at: expiry

        }

    );

    return otp;

};


// Register

const register = async (req) => {

    const connection =
        await pool.getConnection();

    try {

        await cleanupExpiredAuthData();

        const {

            first_name,

            last_name,

            email,

            phone,

            password

        } = req.body;

        await validateRegistration(

            email,

            phone

        );

        const hashedPassword =
            await hashPassword(password);

        const expiry =
            generateOTPExpiry();

        await connection.beginTransaction();

        const pendingId =
            await createPendingRegistration(

                connection,

                {

                    first_name,

                    last_name,

                    email,

                    phone,

                    password: hashedPassword

                },

                expiry

            );

        const otp =
            await generateAndSaveOTP(

                connection,

                pendingId,

                email,

                expiry

            );

        await connection.commit();

        try {
            
            console.log("OTP Generated:", otp);

            console.log("Sending OTP email...");
            
            await NotificationService.sendRegistrationOTP(
            
                email,
            
                otp
            
            );

            console.log("Skipping email...");

            console.log("OTP email sent successfully.");
        
        }
        catch (error) {
        
            console.error("Email sending failed:", error.message);
        
        }
        
        return {

            email,

            expires_at: expiry

        };

    }

    catch (error) {

        console.error("REGISTER ERROR:");

        console.error(error);

        console.error(error.stack);

        await connection.rollback();

        throw error;

    }

    finally {

        connection.release();

    }

};

module.exports = register;