const OrderModel = require("../../../models/order.model");

const generateOrderNumber = async () => {

    while (true) {

        const orderNumber =

            "ORD" +

            Date.now() +

            Math.floor(

                1000 +

                Math.random() * 9000

            );

        const existingOrder =

            await OrderModel.findByOrderNumber(

                orderNumber

            );

        if (!existingOrder) {

            return orderNumber;

        }

    }

};

module.exports = generateOrderNumber;