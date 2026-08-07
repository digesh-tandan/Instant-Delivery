const { pool } =
require("../../config/database");

const DeliveryAssignmentModel =
require("../../models/deliveryAssignment.model");

const {

    DeliveryPartnerModel

} = require("../../models/deliveryPartner.model");

const OrderStatusHistoryModel =
require("../../models/orderStatusHistory.model");

const DELIVERY_MESSAGES =
require("../../constants/deliveryMessages");

const DELIVERY_STATUS =
require("../../helpers/deliveryStatus.helper");

const reassignOrder =
async (req) => {

    const connection =
        await pool.getConnection();

    try {

        await connection.beginTransaction();

        const {

            assignmentId,

            deliveryPartnerId

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

            assignment.status !== DELIVERY_STATUS.ASSIGNED &&
            assignment.status !== DELIVERY_STATUS.REJECTED
                
        ) {
        
            throw new Error(
            
                DELIVERY_MESSAGES.INVALID_ASSIGNMENT_STATUS
            
            );
        
        }
        const partner =
            await DeliveryPartnerModel.findByIdForUpdate(

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

        const busy =
            await DeliveryPartnerModel.hasActiveOrder(

                partner.id,

                connection

            );

        if (busy) {

            throw new Error(

                DELIVERY_MESSAGES.DELIVERY_PARTNER_BUSY

            );

        }

        await DeliveryAssignmentModel.reassign(

            assignment.id,

            partner.id,

            connection

        );

        await DeliveryPartnerModel.setUnavailable(

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

                    "Order reassigned.",

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

module.exports = reassignOrder;