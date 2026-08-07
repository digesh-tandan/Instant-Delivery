const DeliveryAssignmentModel =
require("../../models/deliveryAssignment.model");

const getDeliveryHistory =
async () => {

    return await DeliveryAssignmentModel.getDeliveryHistory();

};

module.exports =
getDeliveryHistory;