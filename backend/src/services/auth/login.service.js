const { pool } = require("../../config/database");

const UserModel = require("../../models/user.model");
const RefreshTokenModel = require("../../models/refreshToken.model");

const {
    comparePassword
} = require("../../helpers/password.helper");

const {

    generateAccessToken,

    generateRefreshToken

} = require("../../helpers/token.helper");

const AUTH_MESSAGES = require("../../constants/authMessages");

const NotificationService =
    require("../../services/notification");

// Validate Login

const validateLogin = async (

    email,

    password

) => {

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

    if (!user.is_active) {

        throw new Error(

            AUTH_MESSAGES.ACCOUNT_PENDING_DELETION

        );

    }

    const isPasswordCorrect =
        await comparePassword(

            password,

            user.password

        );

    if (!isPasswordCorrect) {

        throw new Error(

            AUTH_MESSAGES.INVALID_CREDENTIALS

        );

    }

    return user;

};

// Save Refresh Token

const saveRefreshToken = async (

    connection,

    req,

    user,

    refreshToken

) => {

    const expiry = new Date();

    expiry.setDate(

        expiry.getDate() + 30

    );

    await RefreshTokenModel.create(

        connection,

        {

            user_id: user.id,

            token: refreshToken,

            device_name:

                req.headers["user-agent"],

            ip_address:

                req.ip,

            user_agent:

                req.headers["user-agent"],

            expires_at: expiry

        }

    );

};

// Login

const login = async (

    req

) => {

    const connection =
        await pool.getConnection();

    try {

        const {

            email,

            password

        } = req.body;

        const user =
            await validateLogin(

                email,

                password

            );

        const accessToken =
            generateAccessToken({

                id: user.id,

                role: user.role_id

            });

        const refreshToken =
            generateRefreshToken({

                id: user.id

            });

        await connection.beginTransaction();

        await saveRefreshToken(

            connection,

            req,

            user,

            refreshToken

        );

        await UserModel.updateLastLogin(

            connection,

            user.id

        );

        await connection.commit();

        await NotificationService.sendLoginAlertEmail(

            user.email,
                
            user.first_name,
                
            new Date().toLocaleString(),
                
            req.ip,
                
            req.headers["user-agent"]
                
        );

        return {

            accessToken,

            refreshToken,

            user: {

                id: user.id,

                first_name: user.first_name,

                last_name: user.last_name,

                email: user.email,

                role_id: user.role_id

            }

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

module.exports = login;