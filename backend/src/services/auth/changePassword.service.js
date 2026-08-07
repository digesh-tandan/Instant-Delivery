const { pool } = require("../../config/database");

const UserModel = require("../../models/user.model");
const RefreshTokenModel = require("../../models/refreshToken.model");

const {
    comparePassword,
    hashPassword
} = require("../../helpers/password.helper");

const NotificationService =
require("../../services/notification");

const AUTH_MESSAGES = require("../../constants/authMessages");

// Validate Current Password

const validateCurrentPassword = async (

    user,

    currentPassword,

    newPassword

) => {

    const isPasswordCorrect =
        await comparePassword(

            currentPassword,

            user.password

        );

    if (!isPasswordCorrect) {

        throw new Error(

            AUTH_MESSAGES.CURRENT_PASSWORD_INCORRECT

        );

    }

    const isSamePassword =
        await comparePassword(

            newPassword,

            user.password

        );

    if (isSamePassword) {

        throw new Error(

            AUTH_MESSAGES.PASSWORD_SAME_AS_OLD

        );

    }

};


// Change Password

const changePassword = async (

    req

) => {

    const connection =
        await pool.getConnection();

    try {

        const {

            current_password,

            new_password

        } = req.body;

        const userId = req.user.id;

        const user =
            await UserModel.findById(

                userId

            );

        if (!user) {

            throw new Error(

                AUTH_MESSAGES.ACCOUNT_NOT_FOUND

            );

        }

        await validateCurrentPassword(

            user,

            current_password,

            new_password

        );

        const hashedPassword =
            await hashPassword(

                new_password

            );

        await connection.beginTransaction();

        await UserModel.updatePassword(

            connection,

            user.id,

            hashedPassword

        );

        // Logout all devices

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

module.exports = changePassword;