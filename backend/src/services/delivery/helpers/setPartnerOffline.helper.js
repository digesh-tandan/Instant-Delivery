const {

    DeliveryPartnerModel

} = require("../../models/deliveryPartner.model");

const setPartnerOffline = async (

    partnerId,

    updatedBy,

    connection

) => {

    await DeliveryPartnerModel.setOffline(

        partnerId,

        connection

    );

};

module.exports = setPartnerOffline;