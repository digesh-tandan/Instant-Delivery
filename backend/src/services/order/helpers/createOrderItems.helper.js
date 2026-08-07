const OrderItemModel = require("../../../models/orderItem.model");

const createOrderItems = async (

    orderId,

    cartItems,

    connection

) => {

    for (const item of cartItems) {

        await OrderItemModel.create(

            {

                order_id: orderId,

                variant_id: item.variant_id,

                product_name: item.product_name,

                variant_name: item.variant_name,

                sku: item.sku,

                product_image: item.product_image,

                quantity: item.quantity,

                mrp: item.mrp,

                selling_price: item.final_price,

                total_price: item.total_price

            },

            connection

        );

    }

};

module.exports = createOrderItems;