const DeliveryApplication = require("../../models/deliveryPartnerApplication.model");

module.exports = async (query) => {

    const page = Number(query.page) || 1;

    const limit = Number(query.limit) || 10;

    const offset = (page - 1) * limit;

    return await DeliveryApplication.getAll(

        query.status,

        limit,

        offset

    );

};