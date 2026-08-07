const OrderStatusHistoryModel = require("../../../models/orderStatusHistory.model");

const createOrderHistory = async (

    orderId,

    status,

    updatedBy,

    connection

) => {

    await OrderStatusHistoryModel.create(

        {

            order_id: orderId,

            status,

            remarks: null,

            updated_by: updatedBy

        },

        connection

    );

};

module.exports = createOrderHistory;