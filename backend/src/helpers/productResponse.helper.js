const groupProductsWithVariants = (rows) => {

    const products = new Map();

    for (const row of rows) {

        if (!products.has(row.id)) {

            products.set(row.id, {

                id: row.id,

                category_id: row.category_id,

                brand_id: row.brand_id,

                name: row.name,

                slug: row.slug,

                short_description: row.short_description,

                description: row.description,

                thumbnail: row.thumbnail,

                is_active: row.is_active,

                created_at: row.created_at,

                updated_at: row.updated_at,

                category_name: row.category_name,

                brand_name: row.brand_name,

                variants: []

            });

        }

        if (row.variant_id) {

            products.get(row.id).variants.push({

                id: row.variant_id,

                variant_name: row.variant_name,

                sku: row.sku,

                barcode: row.barcode,

                mrp: row.mrp,

                selling_price: row.selling_price,

                final_price: row.final_price,

                offer_type: row.offer_type,

                offer_value: row.offer_value,

                offer_start_date: row.offer_start_date,

                offer_end_date: row.offer_end_date,

                is_offer_active: row.is_offer_active,

                weight: row.weight,

                unit: row.unit,

                stock_quantity: row.stock_quantity

            });

        }

    }

    return Array.from(products.values());

};

module.exports = {

    groupProductsWithVariants

};