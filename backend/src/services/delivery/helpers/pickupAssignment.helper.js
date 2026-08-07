const DeliveryAssignmentModel = require("../../../models/deliveryAssignment.model");

const pickupAssignment = async (

    assignmentId,

    connection

) => {

    await DeliveryAssignmentModel.pickup(

        assignmentId,

        connection

    );

};

module.exports = pickupAssignment;