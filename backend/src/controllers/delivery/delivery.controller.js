const {

    executeService

} = require("../../utils/executeService");

const DeliveryService =
require("../../services/delivery/delivery.service");

const statusCodes =
require("../../constants/statusCodes");

const DELIVERY_MESSAGES =
require("../../constants/deliveryMessages");

// Assign Order

exports.assignOrder = executeService(

    DeliveryService.assignOrder,

    statusCodes.OK,

    DELIVERY_MESSAGES.ORDER_ASSIGNED_SUCCESSFULLY

);

// Accept Order

exports.acceptOrder = executeService(

    DeliveryService.acceptOrder,

    statusCodes.OK,

    DELIVERY_MESSAGES.ORDER_ACCEPTED_SUCCESSFULLY

);

// Reject Order

exports.rejectOrder = executeService(

    DeliveryService.rejectOrder,

    statusCodes.OK,

    DELIVERY_MESSAGES.ORDER_REJECTED_SUCCESSFULLY

);

// Reassign Order

exports.reassignOrder = executeService(

    DeliveryService.reassignOrder,

    statusCodes.OK,

    DELIVERY_MESSAGES.ORDER_REASSIGNED_SUCCESSFULLY

);

// Pickup Order

exports.pickupOrder = executeService(

    DeliveryService.pickupOrder,

    statusCodes.OK,

    DELIVERY_MESSAGES.ORDER_PICKED_UP_SUCCESSFULLY

);

// Deliver Order

exports.deliverOrder = executeService(

    DeliveryService.deliverOrder,

    statusCodes.OK,

    DELIVERY_MESSAGES.ORDER_DELIVERED_SUCCESSFULLY

);

// Go Online

exports.goOnline = executeService(

    DeliveryService.goOnline,

    statusCodes.OK,

    DELIVERY_MESSAGES.PARTNER_ONLINE_SUCCESSFULLY

);

// Go Offline

exports.goOffline = executeService(

    DeliveryService.goOffline,

    statusCodes.OK,

    DELIVERY_MESSAGES.PARTNER_OFFLINE_SUCCESSFULLY

);

// Update Current Location

exports.updateLocation = executeService(

    DeliveryService.updateLocation,

    statusCodes.OK,

    DELIVERY_MESSAGES.LOCATION_UPDATED

);

exports.trackOrder = executeService(

        DeliveryService.trackOrder,

        statusCodes.OK,

        DELIVERY_MESSAGES.TRACK_ORDER_FETCHED

);


// Get All Delivery Partners

exports.getPartners = executeService(

    DeliveryService.getPartners,

    statusCodes.OK,

    DELIVERY_MESSAGES.DELIVERY_PARTNERS_FETCHED

);

// Get Delivery Partner By Id

exports.getPartnerById = executeService(

    DeliveryService.getPartnerById,

    statusCodes.OK,

    DELIVERY_MESSAGES.DELIVERY_PARTNER_FETCHED

);

// Get Active Deliveries

exports.getActiveDeliveries = executeService(

    DeliveryService.getActiveDeliveries,

    statusCodes.OK,

    DELIVERY_MESSAGES.ACTIVE_DELIVERIES_FETCHED

);

// Get Delivery History

exports.getDeliveryHistory = executeService(

    DeliveryService.getDeliveryHistory,

    statusCodes.OK,

    DELIVERY_MESSAGES.DELIVERY_HISTORY_FETCHED

);

// Get Current Location

exports.getCurrentLocation = executeService(

    DeliveryService.getCurrentLocation,

    statusCodes.OK,

    DELIVERY_MESSAGES.LOCATION_UPDATED_SUCCESSFULLY

);

// Get Assigned Orders

exports.getAssignedOrders = executeService(

    DeliveryService.getAssignedOrders,

    statusCodes.OK,

    DELIVERY_MESSAGES.ORDER_ASSIGNED_SUCCESSFULLY

);

// Get Accepted Orders

exports.getAcceptedOrders = executeService(

    DeliveryService.getAcceptedOrders,

    statusCodes.OK,

    DELIVERY_MESSAGES.ORDER_ACCEPTED_SUCCESSFULLY

);

// Get Picked Orders

exports.getPickedOrders = executeService(

    DeliveryService.getPickedOrders,

    statusCodes.OK,

    DELIVERY_MESSAGES.ORDER_PICKED_UP_SUCCESSFULLY

);

// Get Delivered Orders

exports.getDeliveredOrders = executeService(

    DeliveryService.getDeliveredOrders,

    statusCodes.OK,

    DELIVERY_MESSAGES.ORDER_DELIVERED_SUCCESSFULLY

);