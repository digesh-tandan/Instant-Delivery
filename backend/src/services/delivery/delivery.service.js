module.exports = {

    assignOrder: require("./assignOrder.service"),

    acceptOrder: require("./acceptOrder.service"),

    pickupOrder: require("./pickupOrder.service"),

    deliverOrder: require("./deliverOrder.service"),

    rejectOrder: require("./rejectOrder.service"),

    reassignOrder: require("./reassignOrder.service"),

    goOnline: require("./goOnline.service"),

    goOffline: require("./goOffline.service"),

    updateLocation: require("./updateLocation.service"),

    getCurrentLocation: require("./getCurrentLocation.service"),

    getAssignedOrders: require("./getAssignedOrders.service"),

    getAcceptedOrders: require("./getAcceptedOrders.service"),

    getPickedOrders: require("./getPickedOrders.service"),

    getDeliveredOrders: require("./getDeliveredOrders.service"),

    trackOrder: require("./trackOrder.service"),
    
    getPartners: require("./getPartners.service"),

    getPartnerById: require("./getPartnerById.service"),

    getActiveDeliveries: require("./getActiveDeliveries.service"),

    getDeliveryHistory: require("./getDeliveryHistory.service")

};