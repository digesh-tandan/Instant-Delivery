const {

    DeliveryPartnerModel

} = require("../../models/deliveryPartner.model");

const setPartnerUnavailable = async (

    partnerId,

    updatedBy,

    connection

) => {

    await DeliveryPartnerModel.setUnavailable(

        partnerId,

        connection

    );

};

module.exports = setPartnerUnavailable;