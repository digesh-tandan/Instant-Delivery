const { pool } = require("../../config/database");

const DeliveryAssignmentModel = require("../../models/deliveryAssignment.model");
const {

    DeliveryPartnerModel

} = require("../../models/deliveryPartner.model");
const OrderModel = require("../../models/order.model");
const OrderStatusHistoryModel = require("../../models/orderStatusHistory.model");

const DELIVERY_STATUS = require("../../helpers/deliveryStatus.helper");
const ORDER_STATUS = require("../../helpers/orderStatus.helper");

const UserModel =
require("../../models/user.model");

const NotificationService =
require("../../services/notification");

const ORDER_MESSAGES = require("../../constants/orderMessages");
const DELIVERY_MESSAGES = require("../../constants/deliveryMessages");

const acceptOrder = async (req) => {

    const connection = await pool.getConnection();

    try {

        const {

            assignmentId

        } = req.body;

        await connection.beginTransaction();

        /**
         * Lock Assignment
         */

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

        /**
         * Lock Order
         */

        const order =
            await OrderModel.findByIdForUpdate(

                assignment.order_id,

                connection

            );

        if (!order) {

            throw new Error(

                ORDER_MESSAGES.ORDER_NOT_FOUND

            );

        }

        /**
         * Assignment should be ASSIGNED
         */

        if (

            assignment.status !==
            DELIVERY_STATUS.ASSIGNED

        ) {

            throw new Error(

                DELIVERY_MESSAGES.INVALID_ASSIGNMENT_STATUS

            );

        }

        /**
         * Order should be ASSIGNED
         */

        if (

            order.order_status !==
            ORDER_STATUS.ASSIGNED

        ) {

            throw new Error(

                ORDER_MESSAGES.INVALID_ORDER_STATUS

            );

        }

        /**
         * Logged in partner validation
         */

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

        /**
         * Assigned partner validation
         */

        if (

            assignment.delivery_partner_id !==
            partner.id

        ) {

            throw new Error(

                DELIVERY_MESSAGES.UNAUTHORIZED_DELIVERY_PARTNER

            );

        }

        /**
         * Accept Assignment
         */

        await DeliveryAssignmentModel.accept(

            assignment.id,

            connection

        );

        /**
         * Save Order History
         */

        await OrderStatusHistoryModel.create(

            {

                order_id: order.id,

                status: ORDER_STATUS.ASSIGNED,

                remarks: "Delivery partner accepted the order.",

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
        
            await NotificationService.sendDeliveryPartnerAcceptedEmail(
            
                user.email,
            
                user.first_name,
            
                order.order_number
            
            );
        
        }

        return {

            message:
                DELIVERY_MESSAGES.ORDER_ACCEPTED_SUCCESSFULLY

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

module.exports = acceptOrder;