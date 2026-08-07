const OrderModel = require("../../../models/order.model");

const ORDER_MESSAGES = require("../../../constants/orderMessages");

const validateOrderForPayment = async (

    orderId,

    connection

) => {

    const order =
        await OrderModel.findByIdForUpdate(

            orderId,

            connection

        );

    if (!order) {

        throw new Error(

            ORDER_MESSAGES.ORDER_NOT_FOUND

        );

    }

    return order;

};

module.exports = validateOrderForPayment;