const DeliveryAssignmentModel = require("../../../models/deliveryAssignment.model");

const getAssignmentById = async (

    assignmentId,

    connection

) => {

    return await DeliveryAssignmentModel.findById(

        assignmentId,

        connection

    );

};

module.exports = getAssignmentById;