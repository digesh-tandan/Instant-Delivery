const express = require("express");

const router = express.Router();

const AddressController = require("../../controllers/address/addresses.controller");

const authMiddleware = require("../../middleware/auth.middleware");

const authorize = require("../../middleware/role.middleware");

const validate = require("../../middleware/validation.middleware");

const {

    addAddressValidation,

    updateAddressValidation,

    addressIdValidation,

    setDefaultAddressValidation

} = require("../../validations/addresses/addresses.validation");

// Add Address

router.post(

    "/",

    authMiddleware,

    validate(addAddressValidation),

    AddressController.addAddress

);

// Get All Addresses

router.get(

    "/",

    authMiddleware,

    AddressController.getAddresses

);

// Get User Addresses (Admin Only)

router.get(

    "/admin/:user_id",

    authMiddleware,

    authorize(1),

    AddressController.getUserAddresses

);

// Get Address By ID

router.get(

    "/:address_id",

    authMiddleware,

    validate(addressIdValidation),

    AddressController.getAddressById

);

// Update Address

router.put(

    "/:address_id",

    authMiddleware,

    validate(updateAddressValidation),

    AddressController.updateAddress

);

// Delete Address By Admin

router.delete(

    "/admin/:address_id",

    authMiddleware,

    authorize(1),

    validate(addressIdValidation),

    AddressController.deleteAddressByAdmin

);

// Delete Address

router.delete(

    "/:address_id",

    authMiddleware,

    validate(addressIdValidation),

    AddressController.deleteAddress

);

// Set Default Address

router.patch(

    "/:address_id/default",

    authMiddleware,

    validate(setDefaultAddressValidation),

    AddressController.setDefaultAddress

);

module.exports = router;