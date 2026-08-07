const DeliveryAssignmentModel = require("../../../models/deliveryAssignment.model");

const acceptAssignment = async (

    assignmentId,

    connection

) => {

    await DeliveryAssignmentModel.accept(

        assignmentId,

        connection

    );

};

module.exports = acceptAssignment;