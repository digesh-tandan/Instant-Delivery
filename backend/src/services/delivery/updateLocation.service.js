const {

    DeliveryPartnerModel

} = require("../../models/deliveryPartner.model");

const DELIVERY_MESSAGES =
require("../../constants/deliveryMessages");

const updateLocation = async (req) => {

    const {

        latitude,

        longitude

    } = req.body;

    const partner =
        await DeliveryPartnerModel.findByUserId(

            req.user.id

        );

    if (!partner) {

        throw new Error(

            DELIVERY_MESSAGES.DELIVERY_PARTNER_NOT_FOUND

        );

    }

    await DeliveryPartnerModel.updateCurrentLocation(

        partner.id,

        latitude,

        longitude

    );

    return null;

};

module.exports = updateLocation;