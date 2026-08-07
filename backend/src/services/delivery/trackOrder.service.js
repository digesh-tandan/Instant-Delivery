const DeliveryAssignmentModel =
require("../../models/deliveryAssignment.model");

const ApiError =
require("../../utils/ApiError");

const statusCodes =
require("../../constants/statusCodes");

const DELIVERY_MESSAGES =
require("../../constants/deliveryMessages");

module.exports = async (

    req

) => {

    const {

        orderId

    } = req.params;

    const trackingDetails =
        await DeliveryAssignmentModel.findTrackingDetailsByOrderId(

            orderId

        );

    if (

        !trackingDetails

    ) {

        throw new ApiError(

            statusCodes.NOT_FOUND,

            DELIVERY_MESSAGES.DELIVERY_ASSIGNMENT_NOT_FOUND

        );

    }

    return {

        order_id:

            trackingDetails.order_id,

        order_status:

            trackingDetails.order_status,

        assignment_status:

            trackingDetails.assignment_status,

        assigned_at:

            trackingDetails.assigned_at,

        accepted_at:

            trackingDetails.accepted_at,

        picked_up_at:

            trackingDetails.picked_up_at,

        delivered_at:

            trackingDetails.delivered_at,

        delivery_partner: {

            id:

                trackingDetails.delivery_partner_id,

            first_name:

                trackingDetails.first_name,

            last_name:

                trackingDetails.last_name,

            full_name:

                `${trackingDetails.first_name} ${trackingDetails.last_name}`,

            phone:

                trackingDetails.phone,

            vehicle_type:

                trackingDetails.vehicle_type,

            vehicle_number:

                trackingDetails.vehicle_number

        },

        current_location: {

            latitude:

                trackingDetails.latitude,

            longitude:

                trackingDetails.longitude,

            recorded_at:

                trackingDetails.recorded_at

        }

    };

};