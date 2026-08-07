const VariantModel = require("../../../models/variant.model");

const restoreInventory = async (

    orderItems,

    connection

) => {

    for (const item of orderItems) {

        await VariantModel.increaseStock(

            connection,

            item.variant_id,

            item.quantity

        );

    }

};

module.exports = restoreInventory;