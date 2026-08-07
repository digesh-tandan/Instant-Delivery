const {

    DeliveryPartnerModel

} = require("../../models/deliveryPartner.model");

const getPartners =
async () => {

    return await DeliveryPartnerModel.getPartners();

};

module.exports =
getPartners;