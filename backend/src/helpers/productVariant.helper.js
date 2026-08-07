const calculateFinalPrice = require("./product.helper").calculateFinalPrice;

const buildDefaultVariant = (product) => {

    const mrp = product.mrp ?? 0;
    const sellingPrice = product.selling_price ?? 0;

    return {

        variant_name: "Default",

        sku: product.sku ?? null,

        barcode: product.barcode ?? null,

        mrp,

        selling_price: sellingPrice,

        offer_type: product.offer_type ?? null,

        offer_value: product.offer_value ?? 0,

        final_price: calculateFinalPrice(
            mrp,
            sellingPrice,
            product.offer_type,
            product.offer_value ?? 0,
            product.is_offer_active ?? false
        ),

        offer_start_date: product.offer_start_date ?? null,

        offer_end_date: product.offer_end_date ?? null,

        is_offer_active: product.is_offer_active ?? false,

        weight: product.weight ?? null,

        unit: product.unit ?? null,

        stock_quantity: product.stock_quantity ?? 0,

        is_active: product.is_active ?? true

    };

};

module.exports = {

    buildDefaultVariant

};