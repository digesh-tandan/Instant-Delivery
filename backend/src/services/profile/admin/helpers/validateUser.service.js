const UserModel = require("../../../../models/user.model");

const AUTH_MESSAGES = require("../../../../constants/authMessages");

const validateUser = async (userId) => {

    const user = await UserModel.findById(userId);

    if (!user) {

        throw new Error(

            AUTH_MESSAGES.ACCOUNT_NOT_FOUND

        );

    }

    return user;

};

module.exports = validateUser;