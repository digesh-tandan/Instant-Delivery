const StoreManagerApplication =
require("../../models/storeManagerApplication.model");

const STORE_MANAGER_MESSAGES =
require("../../constants/storeManager.messages");

module.exports = async (

    userId

) => {

    const application =
        await StoreManagerApplication
            .findLatestByUserId(userId);

    if (!application) {

        throw new Error(

            STORE_MANAGER_MESSAGES.APPLICATION_NOT_FOUND

        );

    }

    return application;

};