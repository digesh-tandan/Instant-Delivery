const express = require("express");

const {
    registerRoute
} = require("./routeRegistry");


const createRouter = (basePath) => {

    const router = express.Router();

    const methods = [

        "get",
        "post",
        "put",
        "patch",
        "delete"

    ];


    methods.forEach((method) => {

        const original =
            router[method].bind(router);


        router[method] = (
            path,
            ...handlers
        ) => {

            registerRoute(

                method.toUpperCase(),

                basePath + path

            );


            return original(

                path,

                ...handlers

            );

        };

    });


    return router;

};


module.exports = createRouter;