const UserModel = require("../../../models/user.model");

const validateUser = require("./helpers/validateUser.service");

const getUserById = async (req) => {

    const user = await validateUser(

        req.params.id

    );

    return await UserModel.findUserById(

        user.id

    );

};

module.exports = getUserById;