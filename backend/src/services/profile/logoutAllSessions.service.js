const { pool } = require("../../config/database");

const RefreshTokenModel = require("../../models/refreshToken.model");

const logoutAllSessions = async (req) => {

    const connection = await pool.getConnection();

    try {

        const { refresh_token } = req.body;

        await connection.beginTransaction();

        await RefreshTokenModel.deleteOtherSessions(

            connection,

            req.user.id,

            refresh_token

        );

        await connection.commit();

        return {};

    }

    catch (error) {

        await connection.rollback();

        throw error;

    }

    finally {

        connection.release();

    }

};

module.exports = logoutAllSessions;