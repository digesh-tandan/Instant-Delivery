const DeliveryAssignmentModel = require("../../../models/deliveryAssignment.model");

const rejectAssignment = async (

    assignmentId,

    connection

) => {

    await DeliveryAssignmentModel.reject(

        assignmentId,

        connection

    );

};

module.exports = rejectAssignment;