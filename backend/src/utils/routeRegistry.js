const routes = [];

/**
 * Register a route for automatic API documentation.
 *
 * @param {string} method
 * @param {string} path
 * @param {object} options
 */
const registerRoute = (
    method,
    path,
    options = {}
) => {

    const normalizedMethod = method.toUpperCase();

    const existing = routes.find(
        route =>
            route.path === path &&
            route.methods.includes(normalizedMethod)
    );

    if (existing) {
        return;
    }

    const route = routes.find(
        route => route.path === path
    );

    if (route) {

        route.methods.push(normalizedMethod);

        return;
    }

    routes.push({

        path,

        methods: [
            normalizedMethod
        ],

        ...options

    });

};

/**
 * Get all registered routes.
 */
const getRoutes = () => {

    return routes;

};

/**
 * Clear all registered routes.
 *
 * Useful for testing or rebuilding documentation.
 */
const clearRoutes = () => {

    routes.length = 0;

};

module.exports = {

    registerRoute,

    getRoutes,

    clearRoutes

};