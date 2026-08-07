const { pool } = require("../../config/database");

const RefreshTokenModel = require("../../models/refreshToken.model");

const logoutSession = async (req) => {

    const connection = await pool.getConnection();

    try {

        const sessionId = req.params.id;

        await connection.beginTransaction();

        await RefreshTokenModel.deleteSession(

            connection,

            sessionId,

            req.user.id

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

module.exports = logoutSession;