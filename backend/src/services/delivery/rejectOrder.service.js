const { pool } = require("../../config/database");

const DeliveryAssignmentModel = require("../../models/deliveryAssignment.model");
const {

    DeliveryPartnerModel

} = require("../../models/deliveryPartner.model");
const OrderModel =
require("../../models/order.model");

const ORDER_STATUS =
require("../../helpers/orderStatus.helper");

const OrderStatusHistoryModel = require("../../models/orderStatusHistory.model");

const DELIVERY_STATUS =
require("../../helpers/deliveryStatus.helper");

const ORDER_MESSAGES =
require("../../constants/orderMessages");

const DELIVERY_MESSAGES =
require("../../constants/deliveryMessages");

const rejectOrder = async (req) => {

    const connection =
        await pool.getConnection();

    try {

        await connection.beginTransaction();

        const {

            assignmentId

        } = req.body;

        const assignment =
            await DeliveryAssignmentModel.findByIdForUpdate(

                assignmentId,

                connection

            );

        if (!assignment) {

            throw new Error(

                DELIVERY_MESSAGES.ASSIGNMENT_NOT_FOUND

            );

        }

        if (

            assignment.status !==
            DELIVERY_STATUS.ASSIGNED

        ) {

            throw new Error(

                DELIVERY_MESSAGES.INVALID_ASSIGNMENT_STATUS

            );

        }

        const partner =
            await DeliveryPartnerModel.findByUserId(

                req.user.id,

                connection

            );

        if (!partner) {

            throw new Error(

                DELIVERY_MESSAGES.DELIVERY_PARTNER_NOT_FOUND

            );

        }

        if (

            assignment.delivery_partner_id !==
            partner.id

        ) {

            throw new Error(

                DELIVERY_MESSAGES.UNAUTHORIZED_DELIVERY_PARTNER

            );

        }

        const order =
            await OrderModel.findByIdForUpdate(
            
                assignment.order_id,
            
                connection
            
            );
        
        if (
        
            !order
        
        ) {
        
            throw new Error(
            
                ORDER_MESSAGES.ORDER_NOT_FOUND
            
            );
        
        }
        
        if (
        
            order.order_status !==
            ORDER_STATUS.ASSIGNED
        
        ) {
        
            throw new Error(
            
                ORDER_MESSAGES.INVALID_ORDER_STATUS
            
            );
        
        }

        await DeliveryAssignmentModel.reject(

            assignment.id,

            connection

        );

        await DeliveryPartnerModel.setAvailable(

            partner.id,

            connection

        );

        await OrderStatusHistoryModel.create(

            {

                order_id:

                    assignment.order_id,

                status:

                    "ASSIGNED",

                remarks:

                    "Delivery partner rejected assignment.",

                updated_by:

                    req.user.id

            },

            connection

        );

        await connection.commit();

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

module.exports = rejectOrder;