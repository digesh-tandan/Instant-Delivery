const DeliveryAssignmentModel = require("../../../models/deliveryAssignment.model");

const reassignAssignment = async (

    assignmentId,

    partnerId,

    connection

) => {

    await DeliveryAssignmentModel.reassign(

        assignmentId,

        partnerId,

        connection

    );

};

module.exports = reassignAssignment;