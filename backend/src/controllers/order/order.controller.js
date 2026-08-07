const {

    executeService

} = require("../../utils/executeService");

const statusCodes = require("../../constants/statusCodes");

const ORDER_MESSAGES = require("../../constants/orderMessages");

const OrderService = require("../../services/order");

exports.placeOrder = executeService(

    OrderService.placeOrder,

    statusCodes.CREATED,

    ORDER_MESSAGES.ORDER_PLACED_SUCCESSFULLY

);

exports.getOrders = executeService(

    OrderService.getOrders,

    statusCodes.OK,

    ORDER_MESSAGES.ORDERS_FETCHED_SUCCESSFULLY

);

exports.getOrderById = executeService(

    OrderService.getOrderById,

    statusCodes.OK,

    ORDER_MESSAGES.ORDER_FETCHED_SUCCESSFULLY

);

exports.cancelOrder = executeService(

    OrderService.cancelOrder,

    statusCodes.OK,

    ORDER_MESSAGES.ORDER_CANCELLED_SUCCESSFULLY

);

exports.updateOrderStatus = executeService(

    OrderService.updateOrderStatus,

    statusCodes.OK,

    ORDER_MESSAGES.ORDER_STATUS_UPDATED_SUCCESSFULLY

);