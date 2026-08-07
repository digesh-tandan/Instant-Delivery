const { pool } = require("../../config/database");

const RefreshTokenModel = require("../../models/refreshToken.model");

const {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken
} = require("../../helpers/token.helper");

const AUTH_MESSAGES = require("../../constants/authMessages");

// Validate Refresh Token

const validateRefreshToken = async (refreshToken) => {

    if (!refreshToken) {

        throw new Error(
            AUTH_MESSAGES.INVALID_REFRESH_TOKEN
        );

    }

    // Verify JWT Signature

    let payload;

    try {

        payload = verifyRefreshToken(refreshToken);

    }

    catch (error) {

        throw new Error(
            AUTH_MESSAGES.INVALID_REFRESH_TOKEN
        );

    }

    // Check Database

    const tokenRecord =
        await RefreshTokenModel.findByToken(refreshToken);

    if (!tokenRecord) {

        throw new Error(
            AUTH_MESSAGES.INVALID_REFRESH_TOKEN
        );

    }

    if (tokenRecord.is_revoked) {

        throw new Error(
            AUTH_MESSAGES.SESSION_EXPIRED
        );

    }

    if (new Date(tokenRecord.expires_at) < new Date()) {

        throw new Error(
            AUTH_MESSAGES.REFRESH_TOKEN_EXPIRED
        );

    }

    return {

        payload,

        tokenRecord

    };

};


// Rotate Refresh Token

const rotateRefreshToken = async (

    connection,

    oldRefreshToken,

    payload

) => {

    const accessToken =
        generateAccessToken({

            id: payload.id,

            role: payload.role

        });

    const newRefreshToken =
        generateRefreshToken({

            id: payload.id,

            role: payload.role

        });

    const expiry = new Date();

    expiry.setDate(

        expiry.getDate() + 30

    );

    await RefreshTokenModel.updateToken(

        connection,

        oldRefreshToken,

        newRefreshToken,

        expiry

    );

    return {

        accessToken,

        refreshToken: newRefreshToken

    };

};


// Refresh Token

const refreshToken = async (req) => {

    const connection =
        await pool.getConnection();

    try {

        const {

            refresh_token

        } = req.body;

        const {

            payload

        } = await validateRefreshToken(

            refresh_token

        );

        await connection.beginTransaction();

        const tokens =
            await rotateRefreshToken(

                connection,

                refresh_token,

                payload

            );

        await connection.commit();

        return tokens;

    }

    catch (error) {

        await connection.rollback();

        throw error;

    }

    finally {

        connection.release();

    }

};

module.exports = refreshToken;