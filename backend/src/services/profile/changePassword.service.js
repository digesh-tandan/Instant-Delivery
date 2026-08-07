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

const changePassword = async (req) => {

    const connection = await pool.getConnection();

    try {

        const {

            current_password,

            new_password

        } = req.body;

        const user = await UserModel.findById(

            req.user.id

        );

        if (!user) {

            throw new Error(

                AUTH_MESSAGES.ACCOUNT_NOT_FOUND

            );

        }

        const passwordMatched = await comparePassword(

            current_password,

            user.password

        );

        if (!passwordMatched) {

            throw new Error(

                AUTH_MESSAGES.CURRENT_PASSWORD_INCORRECT

            );

        }

        const samePassword = await comparePassword(

            new_password,

            user.password

        );

        if (samePassword) {

            throw new Error(

                AUTH_MESSAGES.PASSWORD_SAME_AS_OLD

            );

        }

        const hashedPassword = await hashPassword(

            new_password

        );

        await connection.beginTransaction();

        await UserModel.updatePassword(

            connection,

            user.id,

            hashedPassword

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

module.exports = changePassword;