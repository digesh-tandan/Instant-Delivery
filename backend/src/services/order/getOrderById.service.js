const OrderModel = require("../../models/order.model");

const OrderItemModel = require("../../models/orderItem.model");

const OrderStatusHistoryModel = require("../../models/orderStatusHistory.model");

const ORDER_MESSAGES = require("../../constants/orderMessages");

const getOrderById = async (req) => {

    const order = await OrderModel.findById(

        req.params.id

    );

    if (!order) {

        throw new Error(

            ORDER_MESSAGES.ORDER_NOT_FOUND

        );

    }

    if (

        req.user.role_id !== 1 &&

        req.user.role_id !== 4 &&

        order.user_id !== req.user.id

    ) {

        throw new Error(

            ORDER_MESSAGES.ORDER_NOT_FOUND

        );

    }

    const items =

        await OrderItemModel.getByOrderId(

            order.id

        );

    const history =

        await OrderStatusHistoryModel.getByOrderId(

            order.id

        );

    return {

        order,

        items,

        history

    };

};

module.exports = getOrderById;