const createRouter = require("../../utils/routerFactory");

const router = createRouter("/api/v1/del");

const DeliveryController = require("../../controllers/delivery/delivery.controller");

const authenticate = require("../../middleware/auth.middleware");

const authorize = require("../../middleware/role.middleware");

const validate = require("../../middleware/validation.middleware");

const {

    assignOrderValidation,

    acceptOrderValidation,

    rejectOrderValidation,

    reassignOrderValidation,

    pickupOrderValidation,

    deliverOrderValidation,

    updateLocationValidation,

    trackOrderValidation,

    getPartnersValidation,

    getPartnerByIdValidation,

    getActiveDeliveriesValidation,

    getDeliveryHistoryValidation

} = require("../../validations/delivery");

// ADMIN & STORE MANAGER

// Assign Order

router.post(

    "/assign",

    authenticate,

    authorize(1, 4),

    validate(assignOrderValidation),

    DeliveryController.assignOrder

);

// Reassign Order

router.patch(

    "/reassign",

    authenticate,

    authorize(1, 4),

    validate(reassignOrderValidation),

    DeliveryController.reassignOrder

);

// DELIVERY PARTNER

// Go Online

router.patch(

    "/online",

    authenticate,

    authorize(3),

    DeliveryController.goOnline

);

// Go Offline

router.patch(

    "/offline",

    authenticate,

    authorize(3),

    DeliveryController.goOffline

);

// Update Current Location

router.patch(

    "/location",

    authenticate,

    authorize(3),

    validate(updateLocationValidation),

    DeliveryController.updateLocation

);

// Get Current Location

router.get(

    "/location",

    authenticate,

    authorize(3),

    DeliveryController.getCurrentLocation

);

// Accept Order

router.patch(

    "/accept",

    authenticate,

    authorize(3),

    validate(acceptOrderValidation),

    DeliveryController.acceptOrder

);

// Reject Order

router.patch(

    "/reject",

    authenticate,

    authorize(3),

    validate(rejectOrderValidation),

    DeliveryController.rejectOrder

);

// Pickup Order

router.patch(

    "/pickup",

    authenticate,

    authorize(3),

    validate(pickupOrderValidation),

    DeliveryController.pickupOrder

);

// Deliver Order

router.patch(

    "/deliver",

    authenticate,

    authorize(3),

    validate(deliverOrderValidation),

    DeliveryController.deliverOrder

);

// Assigned Orders

router.get(

    "/assigned",

    authenticate,

    authorize(3),

    DeliveryController.getAssignedOrders

);

// Accepted Orders

router.get(

    "/accepted",

    authenticate,

    authorize(3),

    DeliveryController.getAcceptedOrders

);

// Picked Orders

router.get(

    "/picked",

    authenticate,

    authorize(3),

    DeliveryController.getPickedOrders

);

// Delivered Orders

router.get(

    "/delivered",

    authenticate,

    authorize(3),

    DeliveryController.getDeliveredOrders

);

// CUSTOMER

// Track Delivery Status

router.get(

    "/track/:orderId",

    authenticate,

    authorize(1,2,3,4),

    validate(trackOrderValidation),

    DeliveryController.trackOrder

);

// ADMIN & STORE MANAGER

// Get All Delivery Partners

router.get(

    "/partners",

    authenticate,

    authorize(1, 4),

    validate(getPartnersValidation),

    DeliveryController.getPartners

);

// Get Delivery Partner By ID

router.get(

    "/partners/:partnerId",

    authenticate,

    authorize(1, 4),

    validate(getPartnerByIdValidation),

    DeliveryController.getPartnerById

);

// Get Active Deliveries

router.get(

    "/active",

    authenticate,

    authorize(1, 4),

    validate(getActiveDeliveriesValidation),

    DeliveryController.getActiveDeliveries

);

// Delivery History

router.get(

    "/history",

    authenticate,

    authorize(1, 3, 4),

    validate(getDeliveryHistoryValidation),

    DeliveryController.getDeliveryHistory

);

module.exports = router;