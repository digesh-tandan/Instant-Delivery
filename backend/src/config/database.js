const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const dbConfig = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Enable SSL only if DB_SSL=true
if (process.env.DB_SSL === "true") {

    dbConfig.ssl = {
        ca: fs.readFileSync(
            path.join(__dirname, "../../certs/isrgrootx1.pem")
        )
    };

}

const pool = mysql.createPool(dbConfig);

const testConnection = async () => {

    try {

        const connection = await pool.getConnection();

        console.log("MySQL Connected Successfully");

        console.log("Database :", process.env.DB_NAME);

        connection.release();

    } catch (error) {

        console.error("MySQL Connection Failed");

        console.error(error);

        process.exit(1);

    }

};

module.exports = {
    pool,
    testConnection
};