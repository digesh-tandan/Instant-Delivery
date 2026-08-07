const {

    DeliveryPartnerModel

} = require("../../models/deliveryPartner.model");

const DELIVERY_MESSAGES =
require("../../constants/deliveryMessages");

const getPartnerById =
async (req) => {

    const partner =
        await DeliveryPartnerModel.getPartnerById(

            req.params.partnerId

        );

    if (!partner) {

        throw new Error(

            DELIVERY_MESSAGES.DELIVERY_PARTNER_NOT_FOUND

        );

    }

    return partner;

};

module.exports =
getPartnerById;