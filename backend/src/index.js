require("dotenv").config();

const app = require("./app");

const {
    testConnection
} = require("./config/database");

const PORT = process.env.PORT || 10000;

(async () => {

    try {

        await testConnection();

        app.listen(PORT, "0.0.0.0", () => {

            console.log(
                `Server running on 0.0.0.0:${PORT}`
            );

        });

    } catch (error) {

        console.error(
            "Server startup failed:",
            error
        );

        process.exit(1);

    }

})();
