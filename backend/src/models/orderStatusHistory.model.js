const { pool } = require("../config/database");

const TABLE = "order_status_history";

class OrderStatusHistoryModel {

    static async create(data, connection = pool) {

        const [result] = await connection.execute(

            `
            INSERT INTO ${TABLE}
            (
                order_id,
                status,
                remarks,
                updated_by
            )
            VALUES
            (?, ?, ?, ?)
            `,

            [

                data.order_id,

                data.status,

                data.remarks ?? null,

                data.updated_by

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

            ORDER BY created_at ASC

            `,

            [orderId]

        );

        return rows;

    }

}

module.exports = OrderStatusHistoryModel;