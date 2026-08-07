const {

    DeliveryPartnerModel

} = require("../../models/deliveryPartner.model");

const DeliveryAssignmentModel =
require("../../models/deliveryAssignment.model");

const DELIVERY_MESSAGES =
require("../../constants/deliveryMessages");

const getPickedOrders =
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

    return await DeliveryAssignmentModel.getPickedUpOrders(

        partner.id

    );

};

module.exports =
getPickedOrders;