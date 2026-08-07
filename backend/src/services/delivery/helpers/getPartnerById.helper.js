const {

    DeliveryPartnerModel

} = require("../../models/deliveryPartner.model");

const getPartnerById = async (

    partnerId,

    connection

) => {

    return await DeliveryPartnerModel.findById(

        partnerId,

        connection

    );

};

module.exports = getPartnerById;