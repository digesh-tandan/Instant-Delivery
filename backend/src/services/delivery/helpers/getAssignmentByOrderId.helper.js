const DeliveryAssignmentModel = require("../../../models/deliveryAssignment.model");

const getAssignmentByOrderId = async (

    orderId,

    connection

) => {

    return await DeliveryAssignmentModel.findByOrderId(

        orderId,

        connection

    );

};

module.exports = getAssignmentByOrderId;