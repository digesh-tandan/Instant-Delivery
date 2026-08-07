module.exports = {

    createAssignment:

        require("./createAssignment.helper"),

    getAssignmentById:

        require("./getAssignmentById.helper"),

    getAssignmentByOrderId:

        require("./getAssignmentByOrderId.helper"),

    getPartnerById:

        require("./getPartnerById.helper"),

    getAvailablePartners:

        require("./getAvailablePartners.helper"),

    acceptAssignment:

        require("./acceptAssignment.helper"),

    rejectAssignment:

        require("./rejectAssignment.helper"),

    pickupAssignment:

        require("./pickupAssignment.helper"),

    deliverAssignment:

        require("./deliverAssignment.helper"),

    reassignAssignment:

        require("./reassignAssignment.helper"),

    setPartnerAvailable:

        require("./setPartnerAvailable.helper"),

    setPartnerUnavailable:

        require("./setPartnerUnavailable.helper"),

    setPartnerOnline:

        require("./setPartnerOnline.helper"),

    setPartnerOffline:

        require("./setPartnerOffline.helper")

};