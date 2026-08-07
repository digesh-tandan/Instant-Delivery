const {

    DeliveryPartnerModel

} = require("../../models/deliveryPartner.model");

const DELIVERY_MESSAGES =
require("../../constants/deliveryMessages");

const getCurrentLocation = async (req) => {

    const partner =
        await DeliveryPartnerModel.findByUserId(

            req.user.id

        );

    if (!partner) {

        throw new Error(

            DELIVERY_MESSAGES.DELIVERY_PARTNER_NOT_FOUND

        );

    }

    return {

        latitude: partner.current_latitude,
        
        longitude: partner.current_longitude,
        
        isOnline: partner.is_online,
        
        isAvailable: partner.is_available
        
    };

};

module.exports = getCurrentLocation;