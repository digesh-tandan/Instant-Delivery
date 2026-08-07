const {

    DeliveryPartnerModel

} = require("../../models/deliveryPartner.model");
const getAvailablePartners = async (

    connection

) => {

    return await DeliveryPartnerModel.findAvailablePartners(

        connection

    );

};

module.exports = getAvailablePartners;