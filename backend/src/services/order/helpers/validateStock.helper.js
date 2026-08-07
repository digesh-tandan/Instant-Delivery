const ProductVariantModel = require("../../../models/variant.model");

const ORDER_MESSAGES = require("../../../constants/orderMessages");

const validateStock = async (

    cartItems

) => {

    for (const item of cartItems) {

        const variant =

            await ProductVariantModel.findById(

                item.variant_id

            );

        if (

            !variant ||

            variant.stock < item.quantity

        ) {

            throw new Error(

                ORDER_MESSAGES.STOCK_NOT_AVAILABLE

            );

        }

    }

};

module.exports = validateStock;