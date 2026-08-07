const {

    DeliveryPartnerModel

} = require("../../models/deliveryPartner.model");

const setPartnerOnline = async (

    partnerId,

    updatedBy,

    connection

) => {

    await DeliveryPartnerModel.setOnline(

        partnerId,

        connection

    );

};

module.exports = setPartnerOnline;