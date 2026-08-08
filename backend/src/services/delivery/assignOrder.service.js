const { pool } = require("../../config/database");

const OrderModel = require("../../models/order.model");

const {

    DeliveryPartnerModel

} = require("../../models/deliveryPartner.model");

const DeliveryAssignmentModel = require("../../models/deliveryAssignment.model");

const UserModel =
require("../../models/user.model");

const NotificationService =
require("../../services/notification");

const OrderStatusHistoryModel = require("../../models/orderStatusHistory.model");

const ORDER_STATUS = require("../../helpers/orderStatus.helper");

const DELIVERY_STATUS = require("../../helpers/deliveryStatus.helper");

const ORDER_MESSAGES = require("../../constants/orderMessages");

const DELIVERY_MESSAGES = require("../../constants/deliveryMessages");

const assignOrder = async (req) => {

    const connection = await pool.getConnection();

    try {

        const {

            orderId,

            deliveryPartnerId

        } = req.body;

        await connection.beginTransaction();

        const order = await OrderModel.findByIdForUpdate(

            orderId,

            connection

        );

        if (!order) {

            throw new Error(

                ORDER_MESSAGES.ORDER_NOT_FOUND

            );

        }

        if (

            order.order_status !== ORDER_STATUS.PACKING

        ) {

            throw new Error(

                ORDER_MESSAGES.INVALID_ORDER_STATUS

            );

        }

        const partner = await DeliveryPartnerModel.findByIdForUpdate(

            deliveryPartnerId,

            connection

        );

        if (!partner) {

            throw new Error(

                DELIVERY_MESSAGES.DELIVERY_PARTNER_NOT_FOUND

            );

        }

        if (

            !partner.is_online

        ) {

            throw new Error(

                DELIVERY_MESSAGES.DELIVERY_PARTNER_OFFLINE

            );

        }

        if (

            !partner.is_available

        ) {

            throw new Error(

                DELIVERY_MESSAGES.DELIVERY_PARTNER_BUSY

            );

        }

        const assignmentId = await DeliveryAssignmentModel.create(

            {

                order_id: order.id,

                delivery_partner_id: partner.id,

                status: DELIVERY_STATUS.ASSIGNED && DELIVERY_STATUS.CONFIRMED,

            },

            connection

        );

        await DeliveryPartnerModel.setUnavailable(

            partner.id,

            connection

        );

        await OrderModel.updateStatus(

            order.id,

            ORDER_STATUS.ASSIGNED,

            req.user.id,

            connection

        );

        await OrderStatusHistoryModel.create(

            {

                order_id: order.id,

                status: ORDER_STATUS.ASSIGNED,

                remarks: "Order assigned to delivery partner",

                updated_by: req.user.id

            },

            connection

        );

        await connection.commit();

        const user =
            await UserModel.findById(
            
                order.user_id
            
            );
        
        if (user) {
        
            await NotificationService.sendDeliveryPartnerAssignedEmail(
            
                user.email,
            
                user.first_name,
            
                order.order_number,
            
                `${partner.first_name} ${partner.last_name}`
            
            );
        
        }
        
        if (user) {
        
            await NotificationService.sendDeliveryPartnerAssignedEmail(
            
                user.email,
            
                user.first_name,
            
                order.order_number,
            
                `${partner.first_name} ${partner.last_name}`
            
            );
        
        }

        return {

            assignmentId

        };

    }

    catch (error) {

        await connection.rollback();

        throw error;

    }

    finally {

        connection.release();

    }

};

module.exports = assignOrder;