const RefreshTokenModel = require("../../models/refreshToken.model");

const getSessions = async (req) => {

    const sessions = await RefreshTokenModel.findActiveSessions(

        req.user.id

    );

    return sessions.map(session => ({

        session_id: session.id,

        device_name: session.device_name,

        ip_address: session.ip_address,

        user_agent: session.user_agent,

        created_at: session.created_at,

        expires_at: session.expires_at,

        current_session:

            req.refreshToken === session.token

    }));

};

module.exports = getSessions;