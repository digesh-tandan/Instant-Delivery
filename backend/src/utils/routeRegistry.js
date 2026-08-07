const routes = [];

// Register a route with its allowed methods

const registerRoute = (

    method,

    path

) => {

    const existing = routes.find(

        route => route.path === path

    );

    if (existing) {

        if (

            !existing.methods.includes(method)

        ) {

            existing.methods.push(method);

        }

        return;

    }

    routes.push({

        path,

        methods: [

            method

        ]

    });

};

// Get all routes

const getRoutes = () => routes;

module.exports = {

    registerRoute,

    getRoutes

};