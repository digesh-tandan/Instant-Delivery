const UserModel = require("../../models/user.model");

const AUTH_MESSAGES = require("../../constants/authMessages");

// Fetch User Profile

const getProfile = async (req) => {

    const user = await UserModel.findProfileById(

        req.user.id

    );

    if (!user) {

        throw new Error(

            AUTH_MESSAGES.ACCOUNT_NOT_FOUND

        );

    }

    return user;

};

module.exports = getProfile;