const {

    DeliveryPartnerModel

} = require("../../models/deliveryPartner.model");
const DeliveryAssignmentModel =
require("../../models/deliveryAssignment.model");

const DELIVERY_MESSAGES =
require("../../constants/deliveryMessages");

const getAssignedOrders =
async (req) => {

    const partner =
        await DeliveryPartnerModel.findByUserId(

            req.user.id

        );

    if (!partner) {

        throw new Error(

            DELIVERY_MESSAGES.DELIVERY_PARTNER_NOT_FOUND

        );

    }

    return await DeliveryAssignmentModel.getAssignedOrders(

        partner.id

    );

};

module.exports = getAssignedOrders;