const DeliveryApplication = require("../../../models/deliveryPartnerApplication.model");

module.exports = async (userId) => {

    const application = await DeliveryApplication.findLatestByUserId(userId);

    if (!application) {

        throw new Error("No application found.");

    }

    return application;

};