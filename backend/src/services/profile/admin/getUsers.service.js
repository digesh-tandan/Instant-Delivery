const UserModel = require("../../../models/user.model");

const getUsers = async () => {

    return await UserModel.findAll();

};

module.exports = getUsers;