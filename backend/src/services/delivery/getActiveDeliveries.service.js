const DeliveryAssignmentModel =
require("../../models/deliveryAssignment.model");

const getActiveDeliveries =
async () => {

    return await DeliveryAssignmentModel.getActiveDeliveries();

};

module.exports =
getActiveDeliveries;