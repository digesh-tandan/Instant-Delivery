const express = require("express");

const router = express.Router();

const authenticate = require("../../middleware/auth.middleware");

const authorize = require("../../middleware/role.middleware");

const OrderController = require("../../controllers/order/order.controller");

const OrderValidation = require("../../validations/order/order.validation");

router.use(authenticate);

router.post(

    "/",

    authorize(2),

    OrderValidation.placeOrder,

    OrderController.placeOrder

);

router.get(

    "/",

    OrderController.getOrders

);

router.get(

    "/:id",

    OrderValidation.orderId,

    OrderController.getOrderById

);

router.delete(

    "/:id",

    authorize(2),

    OrderValidation.orderId,

    OrderController.cancelOrder

);

router.patch(

    "/:id/status",

    authorize(1, 4),

    OrderValidation.updateStatus,

    OrderController.updateOrderStatus

);

module.exports = router;