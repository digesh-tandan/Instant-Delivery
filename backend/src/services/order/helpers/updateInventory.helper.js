const ProductVariantModel = require("../../../models/variant.model");

const updateInventory = async (
    cartItems,
    connection
) => {

    for (const item of cartItems) {

        await ProductVariantModel.decreaseStock(
            connection,
            item.variant_id,
            item.quantity
        );

    }

};

module.exports = updateInventory;