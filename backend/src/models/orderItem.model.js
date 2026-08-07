const { pool } = require("../config/database");

const TABLE = "order_items";

class OrderItemModel {

    static async create(data, connection = pool) {

        const [result] = await connection.execute(

            `
            INSERT INTO ${TABLE}
            (
                order_id,
                variant_id,
                product_name,
                variant_name,
                sku,
                product_image,
                quantity,
                mrp,
                selling_price,
                total_price
            )
            VALUES
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `,

            [

                data.order_id,

                data.variant_id,

                data.product_name,

                data.variant_name,

                data.sku,

                data.product_image,

                data.quantity,

                data.mrp,

                data.selling_price,

                data.total_price

            ]

        );

        return result.insertId;

    }

    static async getByOrderId(orderId, connection = pool) {

        const [rows] = await connection.execute(

            `

            SELECT *

            FROM ${TABLE}

            WHERE order_id = ?

            `,

            [orderId]

        );

        return rows;

    }

}

module.exports = OrderItemModel;