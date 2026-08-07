const UserModel = require("../../models/user.model");

const AUTH_MESSAGES = require("../../constants/authMessages");

// Get User Profile

const getProfile = async (req) => {

    const userId = req.user.id;

    const user = await UserModel.findById(userId);

    if (!user) {

        throw new Error(
            AUTH_MESSAGES.ACCOUNT_NOT_FOUND
        );

    }

    return {

        id: user.id,

        role_id: user.role_id,

        first_name: user.first_name,

        last_name: user.last_name,

        email: user.email,

        phone: user.phone,

        profile_image: user.profile_image,

        gender: user.gender,

        date_of_birth: user.date_of_birth,

        is_active: user.is_active,

        is_verified: user.is_verified,

        last_login: user.last_login,

        created_at: user.created_at

    };

};

module.exports = getProfile;