const { pool } = require("../../config/database");

const OrderModel = require("../../models/order.model");
const OrderItemModel = require("../../models/orderItem.model");
const OrderStatusHistoryModel = require("../../models/orderStatusHistory.model");
const VariantModel = require("../../models/variant.model");

const ORDER_MESSAGES = require("../../constants/orderMessages");

const UserModel =
require("../../models/user.model");

const NotificationService =
require("../../services/notification");

const {

    ORDER_TRANSITIONS,

    validateStatusTransition

} = require("./helpers/validateStatusTransition.helper");

const VALID_STATUS = Object.keys(

    ORDER_TRANSITIONS

);

const updateOrderStatus = async (req) => {

    const connection = await pool.getConnection();

    try {

        const {

            status,

            remarks

        } = req.body;

        if (

            !VALID_STATUS.includes(status)

        ) {

            throw new Error(

                ORDER_MESSAGES.INVALID_ORDER_STATUS

            );

        }

        await connection.beginTransaction();

        const order = await OrderModel.findByIdForUpdate(

            req.params.id,

            connection

        );

        if (!order) {

            throw new Error(

                ORDER_MESSAGES.ORDER_NOT_FOUND

            );

        }

        validateStatusTransition(

            order.order_status,

            status

        );

        await OrderModel.updateStatus(

            order.id,

            status,

            req.user.id,

            connection

        );

        await OrderStatusHistoryModel.create(

            {

                order_id: order.id,

                status,

                remarks,

                updated_by: req.user.id

            },

            connection

        );

        if (

            status === "CANCELLED" ||

            status === "RETURNED"

        ) {

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

        }

        await connection.commit();

        const user =
            await UserModel.findById(
            
                order.user_id
            
            );
        
        if (user) {
        
            switch (status) {
            
                case "PACKING":
            
                    await NotificationService.sendOrderPackedEmail(
                    
                        user.email,
                    
                        user.first_name,
                    
                        order.order_number
                    
                    );
                
                    break;
                
                case "RETURNED":
                
                    await NotificationService.sendOrderReturnedEmail(
                    
                        user.email,
                    
                        user.first_name,
                    
                        order.order_number
                    
                    );
                
                    break;
                
            }
        
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

module.exports = updateOrderStatus;