const OrderModel = require("../../../models/order.model");

const createOrder = async (

    orderData,

    connection

) => {

    return await OrderModel.create(

        orderData,

        connection

    );

};

module.exports = createOrder;