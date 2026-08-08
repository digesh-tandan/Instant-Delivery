const {
    getRoutes
} = require("./routeRegistry");


const generateOpenAPI = () => {

    const routes =
        getRoutes();


    const paths = {};


    routes.forEach((route) => {

        if (!paths[route.path]) {

            paths[route.path] = {};

        }


        route.methods.forEach((method) => {

            paths[route.path][
                method.toLowerCase()
            ] = {

                summary:
                    `${method} ${route.path}`,

                responses: {

                    "200": {

                        description:
                            "Request successful"

                    },

                    "400": {

                        description:
                            "Bad request"

                    },

                    "401": {

                        description:
                            "Unauthorized"

                    },

                    "403": {

                        description:
                            "Forbidden"

                    },

                    "404": {

                        description:
                            "Resource not found"

                    },

                    "500": {

                        description:
                            "Internal server error"

                    }

                }

            };

        });

    });


    return {

        openapi: "3.0.3",

        info: {

            title:
                "Instant Delivery API",

            version:
                "1.0.0",

            description:
                "REST API documentation for the Instant Delivery application."

        },


        servers: [

            {

                url:
                    "http://localhost:5000",

                description:
                    "Local Development"

            },

            {

                url:
                    "https://instant-delivery-backend-e2lq.onrender.com",

                description:
                    "Production"

            }

        ],


        components: {

            securitySchemes: {

                bearerAuth: {

                    type: "http",

                    scheme: "bearer",

                    bearerFormat: "JWT"

                }

            }

        },


        paths

    };

};


module.exports =
    generateOpenAPI;