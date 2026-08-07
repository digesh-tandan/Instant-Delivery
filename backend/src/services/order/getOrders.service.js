const OrderModel = require("../../models/order.model");

const getOrders = async (req) => {

    const roleId = req.user.role_id;

    if (roleId === 1 || roleId === 4) {

        return await OrderModel.getAll();

    }

    return await OrderModel.getOrdersByUser(

        req.user.id

    );

};

module.exports = getOrders;