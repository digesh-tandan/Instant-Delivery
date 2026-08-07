const { pool } = require("../../config/database");

const DeliveryAssignmentModel = require("../../models/deliveryAssignment.model");
const {

    DeliveryPartnerModel

} = require("../../models/deliveryPartner.model");
const OrderModel = require("../../models/order.model");
const PaymentModel = require("../../models/payment.model");
const OrderStatusHistoryModel = require("../../models/orderStatusHistory.model");
const UserModel =
require("../../models/user.model");

const NotificationService =
require("../../services/notification");
const DELIVERY_STATUS = require("../../helpers/deliveryStatus.helper");
const ORDER_STATUS = require("../../helpers/orderStatus.helper");
const PAYMENT_STATUS = require("../../helpers/paymentStatus.helper");
const PAYMENT_METHOD = require("../../helpers/paymentMethod.helper");

const DELIVERY_MESSAGES = require("../../constants/deliveryMessages");
const ORDER_MESSAGES = require("../../constants/orderMessages");

const deliverOrder = async (req) => {

    const connection = await pool.getConnection();

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

        if (

            assignment.status !==
            DELIVERY_STATUS.PICKED_UP

        ) {

            throw new Error(

                DELIVERY_MESSAGES.INVALID_ASSIGNMENT_STATUS

            );

        }

        if (

            order.order_status !==
            ORDER_STATUS.OUT_FOR_DELIVERY

        ) {

            throw new Error(

                ORDER_MESSAGES.INVALID_ORDER_STATUS

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

        await DeliveryAssignmentModel.deliver(

            assignment.id,

            connection

        );

        await DeliveryPartnerModel.setAvailable(

            partner.id,

            connection

        );

        await OrderModel.updateStatus(

            order.id,

            ORDER_STATUS.DELIVERED,

            req.user.id,

            connection

        );

        if (

            order.payment_method ===
            PAYMENT_METHOD.COD

        ) {

            const payment =
                await PaymentModel.findByOrderId(

                    order.id,

                    connection

                );

            if (payment) {

                await PaymentModel.markPaid(

                    payment.id,
                                
                    null,
                                
                    null,
                                
                    payment.transaction_id,
                                
                    {
                    
                        source: "COD"
                    
                    },
                
                    connection
                
                );

            }

            await OrderModel.updatePaymentStatus(

                order.id,

                PAYMENT_STATUS.PAID,

                req.user.id,

                connection

            );

        }

        await OrderStatusHistoryModel.create(

            {

                order_id: order.id,

                status: ORDER_STATUS.DELIVERED,

                remarks: "Order delivered successfully.",

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
        
            await NotificationService.sendOrderDeliveredEmail(
            
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

module.exports = deliverOrder;