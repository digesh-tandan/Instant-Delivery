const DeliveryAssignmentModel = require("../../../models/deliveryAssignment.model");

const deliverAssignment = async (

    assignmentId,

    connection

) => {

    await DeliveryAssignmentModel.deliver(

        assignmentId,

        connection

    );

};

module.exports = deliverAssignment;