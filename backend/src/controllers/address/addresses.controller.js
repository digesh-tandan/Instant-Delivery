const {

    executeService

} = require("../../utils/executeService");

const AddressService = require("../../services/address/addresses.service");

const statusCodes = require("../../constants/statusCodes");

const ADDRESS_MESSAGES = require("../../constants/addressMessages");

const {successResponse

} = require("../../helpers/response.helper");

// Add Address

exports.addAddress = executeService(

    AddressService.addAddress,

    statusCodes.CREATED,

    ADDRESS_MESSAGES.ADDRESS_ADDED

);

// Get All Addresses

exports.getAddresses = executeService(

    AddressService.getAddresses,

    statusCodes.OK,

    ADDRESS_MESSAGES.ADDRESSES_FETCHED

);

// Get Address By ID

exports.getAddressById = executeService(

    AddressService.getAddressById,

    statusCodes.OK,

    ADDRESS_MESSAGES.ADDRESS_FETCHED

);

// Update Address

exports.updateAddress = executeService(

    AddressService.updateAddress,

    statusCodes.OK,

    ADDRESS_MESSAGES.ADDRESS_UPDATED

);

// Delete Address

exports.deleteAddress = executeService(

    AddressService.deleteAddress,

    statusCodes.OK,

    ADDRESS_MESSAGES.ADDRESS_DELETED

);

// Set Default Address

exports.setDefaultAddress = executeService(

    AddressService.setDefaultAddress,

    statusCodes.OK,

    ADDRESS_MESSAGES.DEFAULT_ADDRESS_UPDATED

);

// Get User Addresses by Admin

exports.getUserAddresses = executeService(

    AddressService.getUserAddresses,

    statusCodes.OK,

    ADDRESS_MESSAGES.ADDRESS_FETCHED
);

exports.deleteAddressByAdmin = executeService(

    AddressService.deleteAddressByAdmin,

    statusCodes.OK,

    ADDRESS_MESSAGES.ADDRESS_DELETED

);