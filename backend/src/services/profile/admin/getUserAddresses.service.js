const UserModel = require("../../../models/user.model");

const AddressModel = require("../../../models/addresses.model");

const validateUser = require("./helpers/validateUser.service");

const getUserAddresses = async (req) => {

    const user = await validateUser(

        req.params.id

    );

    return {

        user: await UserModel.findUserById(

            user.id

        ),

        addresses: await AddressModel.findAllByAdmin(

            user.id

        )

    };

};

module.exports = getUserAddresses;