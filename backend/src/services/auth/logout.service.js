const { pool } = require("../../config/database");

const RefreshTokenModel = require("../../models/refreshToken.model");

const AUTH_MESSAGES = require("../../constants/authMessages");

const logout = async (req) => {

    const connection = await pool.getConnection();

    try {
        const { refreshToken } = req.body;
        if (!refreshToken) { 
            throw new Error(
                AUTH_MESSAGES.INVALID_REFRESH_TOKEN
            );
        }
        const token = await RefreshTokenModel.findByToken(
            refreshToken
        );
        if (!token) {
            throw new Error(
                AUTH_MESSAGES.INVALID_REFRESH_TOKEN
            );
        }

        await connection.beginTransaction();

        await RefreshTokenModel.revokeToken(

            connection,

            refreshToken

        );

        await connection.commit();

        return {

            message: AUTH_MESSAGES.LOGOUT_SUCCESS

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

module.exports = logout;