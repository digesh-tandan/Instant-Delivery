const AddressModel = require("../../../models/addresses.model");

const ORDER_MESSAGES = require("../../../constants/orderMessages");

const validateAddress = async (

    addressId,

    userId

) => {

    const address =

        await AddressModel.findById(

            addressId

        );

    if (

        !address ||

        address.user_id !== userId

    ) {

        throw new Error(

            ORDER_MESSAGES.ADDRESS_NOT_FOUND

        );

    }

    return address;

};

module.exports = validateAddress;