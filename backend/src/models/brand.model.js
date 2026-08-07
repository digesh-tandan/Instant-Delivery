const { pool } = require("../config/database");

const BrandModel = {

    async findById(id) {

        const sql = `
            SELECT *
            FROM brands
            WHERE id = ?
              AND is_active = 1
            LIMIT 1
        `;

        const [rows] = await pool.execute(sql, [id]);

        return rows[0] || null;
    }

};

module.exports = BrandModel;