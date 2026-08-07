const DeliveryAssignmentModel = require("../../../models/deliveryAssignment.model");

const createAssignment = async (

    assignmentData,

    connection

) => {

    return await DeliveryAssignmentModel.create(

        assignmentData,

        connection

    );

};

module.exports = createAssignment;