const { pool } = require("../../config/database");

const OrderModel = require("../../models/order.model");

const OrderItemModel = require("../../models/orderItem.model");

const OrderStatusHistoryModel = require("../../models/orderStatusHistory.model");

const VariantModel = require("../../models/variant.model");

const UserModel = require("../../models/user.model");

const ORDER_MESSAGES = require("../../constants/orderMessages");

const NotificationService = require("../../services/notification");

const cancelOrder = async (req) => {

    const connection = await pool.getConnection();

    try {

        const order = await OrderModel.findById(

            req.params.id,

            connection

        );

        if (!order) {

            throw new Error(

                ORDER_MESSAGES.ORDER_NOT_FOUND

            );

        }

        if (

            order.user_id !== req.user.id

        ) {

            throw new Error(

                ORDER_MESSAGES.ORDER_NOT_FOUND

            );

        }

        if (

            order.order_status === "DELIVERED"

        ) {

            throw new Error(

                ORDER_MESSAGES.ORDER_ALREADY_DELIVERED

            );

        }

        if (

            order.order_status === "OUT_FOR_DELIVERY"

        ) {

            throw new Error(

                ORDER_MESSAGES.ORDER_CANNOT_BE_CANCELLED

            );

        }

        if (

            order.order_status === "RETURNED"

        ) {

            throw new Error(

                ORDER_MESSAGES.ORDER_ALREADY_RETURNED

            );

        }

        if (

            order.order_status === "CANCELLED"

        ) {

            throw new Error(

                ORDER_MESSAGES.ORDER_ALREADY_CANCELLED

            );

        }

        await connection.beginTransaction();

        await OrderModel.updateStatus(

            order.id,

            "CANCELLED",

            req.user.id,

            connection

        );

        await OrderStatusHistoryModel.create(

            {

                order_id: order.id,

                status: "CANCELLED",

                remarks: null,

                updated_by: req.user.id

            },

            connection

        );

        const items = await OrderItemModel.getByOrderId(

            order.id,

            connection

        );

        for (const item of items) {

            await VariantModel.increaseStock(

                connection,

                item.variant_id,

                item.quantity

            );

        }

        await connection.commit();

        const user =
            await UserModel.findById(
            
                order.user_id
            
            );
        
        if (user) {
        
            await NotificationService.sendOrderCancelledEmail(
            
                user.email,
            
                user.first_name,
            
                order.order_number
            
            );
        
        }

        return null;

    }

    catch (error) {

        await connection.rollback();

        throw error;

    }

    finally {

        connection.release();

    }

};

module.exports = cancelOrder;