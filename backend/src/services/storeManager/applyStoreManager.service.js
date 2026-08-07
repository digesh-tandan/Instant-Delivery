const StoreManagerApplication =
require("../../models/storeManagerApplication.model");

const StoreManager =
require("../../models/storeManager.model");

const User =
require("../../models/user.model");

const STORE_MANAGER_MESSAGES =
require("../../constants/storeManager.messages");

module.exports = async (

    userId,

    body

) => {

    const user =
        await User.findById(userId);

    if (!user) {

        throw new Error("User not found.");

    }

    if (user.role_id !== 2) {

        throw new Error(

            STORE_MANAGER_MESSAGES.ONLY_CUSTOMER_CAN_APPLY

        );

    }

    const alreadyManager =
        await StoreManager.findByUserId(userId);

    if (alreadyManager) {

        throw new Error(

            "User is already a Store Manager."

        );

    }

    const pending =
        await StoreManagerApplication
            .findPendingByUserId(userId);

    if (pending) {

        throw new Error(

            STORE_MANAGER_MESSAGES.APPLICATION_ALREADY_PENDING

        );

    }

    await StoreManagerApplication.create({

        user_id: userId,

        store_name: body.store_name,

        store_address: body.store_address,

        experience_years: body.experience_years

    });

    return {

        success: true,

        message:
            STORE_MANAGER_MESSAGES.APPLICATION_SUBMITTED

    };

};