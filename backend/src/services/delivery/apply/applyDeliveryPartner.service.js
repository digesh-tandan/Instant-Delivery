const DeliveryApplication = require("../../../models/deliveryPartnerApplication.model");
const User = require("../../../models/user.model");

module.exports = async (userId, body) => {

    const user = await User.findById(userId);

    if (!user)
        throw new Error("User not found.");

    if (user.role_id !== 2)
        throw new Error("Only customers can apply.");

    const pending = await DeliveryApplication.findPendingByUserId(userId);

    if (pending)
        throw new Error("Application already pending.");

    await DeliveryApplication.create({

        user_id: userId,

        vehicle_type: body.vehicle_type,

        vehicle_number: body.vehicle_number,

        driving_license: body.driving_license

    });

    return {

        success: true,

        message: "Application submitted successfully."

    };

};