const ORDER_MESSAGES = require("../../../constants/orderMessages");

const ORDER_TRANSITIONS = {

    PLACED: [

        "CONFIRMED",

        "PACKING",

        "CANCELLED"

    ],

    CONFIRMED: [

        "PACKING",

        "CANCELLED"

    ],

    PACKING: [

        "ASSIGNED",

        "CANCELLED"

    ],

    ASSIGNED: [

        "OUT_FOR_DELIVERY",

        "CANCELLED"

    ],

    OUT_FOR_DELIVERY: [

        "DELIVERED"

    ],

    DELIVERED: [

        "RETURNED"

    ],

    RETURNED: [],

    CANCELLED: []

};

const validateStatusTransition = (

    currentStatus,

    newStatus

) => {

    const allowedTransitions =

        ORDER_TRANSITIONS[currentStatus] || [];

    if (

        !allowedTransitions.includes(newStatus)

    ) {

        throw new Error(

            ORDER_MESSAGES.INVALID_STATUS_TRANSITION

        );

    }

};

module.exports = {

    ORDER_TRANSITIONS,

    validateStatusTransition

};