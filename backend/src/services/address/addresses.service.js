const { pool } = require("../../config/database");

const AddressModel = require("../../models/addresses.model");

const AppError = require("../../utils/AppError");

const ERROR_CODES = require("../../constants/errorCodes");

const ADDRESS_MESSAGES = require("../../constants/addressMessages");

const UserModel = require("../../models/user.model");

// Validate Address Ownership

const validateAddressOwnership = async (

    addressId,

    userId

) => {

    const isOwner = await AddressModel.isOwnedByUser(

        addressId,

        userId

    );

    if (!isOwner) {

        throw new AppError(

            ADDRESS_MESSAGES.ADDRESS_NOT_FOUND,

            404,

            ERROR_CODES.NOT_FOUND

        );

    }

};

// Prepare Address Data

const prepareAddressData = (

    req

) => {

    const {

        title,

        receiver_name,

        receiver_phone,

        address_line1,

        address_line2,

        landmark,

        city,

        state,

        pincode,

        latitude,

        longitude,

        is_default

    } = req.body;

    return {

        user_id: req.user.id,

        title,

        receiver_name: receiver_name?.trim(),

        receiver_phone,

        address_line1: address_line1?.trim(),

        address_line2: address_line2?.trim(),

        landmark: landmark?.trim(),

        city: city?.trim(),

        state: state?.trim(),

        pincode,

        latitude,

        longitude,

        is_default,

        created_by: req.user.id,

        updated_by: req.user.id

    };

};

// Add Address

const addAddress = async (

    req

) => {

    const connection = await pool.getConnection();

    try {

        const addressData = prepareAddressData(

            req

        );

        await connection.beginTransaction();

        const totalAddresses = await AddressModel.countByUserId(

            req.user.id

        );

        if (

            totalAddresses === 0

        ) {

            addressData.is_default = true;

        }

        else if (

            addressData.is_default

        ) {

            await AddressModel.clearDefaultByUserId(

                connection,

                req.user.id

            );

        }

        const addressId = await AddressModel.create(

            connection,

            addressData

        );

        await connection.commit();

        return await AddressModel.findById(

            addressId

        );

    }

    catch (

        error

    ) {

        await connection.rollback();

        throw error;

    }

    finally {

        connection.release();

    }

};

// Get All Addresses

const getAddresses = async (

    req

) => {

    return await AddressModel.findAllByUserId(

        req.user.id

    );

};

// Get Address By ID

const getAddressById = async (

    req

) => {

    const {

        address_id

    } = req.params;

    await validateAddressOwnership(

        address_id,

        req.user.id

    );

    return await AddressModel.findById(

        address_id

    );

};

// Update Address

const updateAddress = async (

    req

) => {

    const connection = await pool.getConnection();

    try {

        const {

            address_id

        } = req.params;

        await validateAddressOwnership(

            address_id,

            req.user.id

        );

        const addressData = prepareAddressData(

            req

        );

        await connection.beginTransaction();

        if (

            addressData.is_default === true

        ) {

            await AddressModel.clearDefaultByUserId(

                connection,

                req.user.id

            );

            await AddressModel.setDefault(

                connection,

                address_id

            );
        }

        await AddressModel.update(

            connection,

            address_id,

            addressData

        );

        await connection.commit();

        return await AddressModel.findById(

            address_id

        );

    }

    catch (

        error

    ) {

        await connection.rollback();

        throw error;

    }

    finally {

        connection.release();

    }

};

// Delete Address

const deleteAddress = async (

    req

) => {

    const connection = await pool.getConnection();

    try {

        const {

            address_id

        } = req.params;

        await validateAddressOwnership(

            address_id,

            req.user.id

        );

        await connection.beginTransaction();

        const address = await AddressModel.findById(

            address_id

        );

        await AddressModel.softDelete(

            connection,

            address_id,

            req.user.id

        );

        if (

            address.is_default

        ) {

            const addresses = await AddressModel.findAllByUserId(

                req.user.id

            );

            if (

                addresses.length > 0

            ) {

                await AddressModel.setDefault(

                    connection,

                    addresses[0].id

                );

            }

        }

        await connection.commit();

    }

    catch (

        error

    ) {

        await connection.rollback();

        throw error;

    }

    finally {

        connection.release();

    }

};

// Set Default Address

const setDefaultAddress = async (

    req

) => {

    const connection = await pool.getConnection();

    try {

        const {

            address_id

        } = req.params;

        await validateAddressOwnership(

            address_id,

            req.user.id

        );

        await connection.beginTransaction();

        await AddressModel.clearDefaultByUserId(

            connection,

            req.user.id

        );

        await AddressModel.setDefault(

            connection,

            address_id

        );

        await connection.commit();

        return await AddressModel.findById(

            address_id

        );

    }

    catch (

        error

    ) {

        await connection.rollback();

        throw error;

    }

    finally {

        connection.release();

    }

};

// Get User Addresses By Admin

const getUserAddresses = async (req) => {

    const user = await UserModel.findUserById(

        req.params.user_id

    );

    if (!user) {

        throw new Error(

            AUTH_MESSAGES.ACCOUNT_NOT_FOUND

        );

    }

    const addresses = await AddressModel.findAllByAdmin(

        req.params.user_id

    );

    if (addresses.length === 0) {

        throw new Error(

            ADDRESS_MESSAGES.NO_ADDRESS_FOUND

        );

    }

    return {

        user,

        addresses

    };

};

// Delete Address By Admin

const deleteAddressByAdmin = async (req) => {

    const connection = await pool.getConnection();

    try {

        const {

            address_id

        } = req.params;

        const address = await AddressModel.findByIdForAdmin(

            address_id

        );

        if (!address) {

            throw new Error(

                ADDRESS_MESSAGES.ADDRESS_NOT_FOUND

            );

        }

        if (address.deleted_at) {

            throw new Error(

                ADDRESS_MESSAGES.ADDRESS_ALREADY_DELETED

            );

        }

        await connection.beginTransaction();

        await AddressModel.softDelete(

            connection,

            address_id,

            req.user.id

        );

        if (address.is_default) {

            const addresses = await AddressModel.findAllByUserId(

                address.user_id

            );

            if (addresses.length > 0) {

                await AddressModel.setDefault(

                    connection,

                    addresses[0].id

                );

            }

        }

        await connection.commit();

        return null;

    }

    catch (error) {

        await connection.rollback();

        throw error;

    }

    finally {

        connection.release();

    }

};

module.exports = {

    addAddress,

    getAddresses,

    getAddressById,

    updateAddress,

    deleteAddress,

    setDefaultAddress,

    getUserAddresses,

    deleteAddressByAdmin

};