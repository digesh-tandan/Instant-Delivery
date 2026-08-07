const {

    DeliveryPartnerModel

} = require("../../models/deliveryPartner.model");

const setPartnerAvailable = async (

    partnerId,

    updatedBy,

    connection

) => {

    await DeliveryPartnerModel.setAvailable(

        partnerId,

        connection

    );

};

module.exports = setPartnerAvailable;