const layoutTemplate =
require("./layout.template");

const orderCancelledTemplate = (

    firstName,

    orderNumber

) => {

    return layoutTemplate(

        "Order Cancelled",

        `

<h2>

Hello ${firstName}

</h2>

<p>

Your order has been cancelled successfully.

</p>

<p>

Order Number

<br>

<b>

${orderNumber}

</b>

</p>

<p>

If payment was completed,

the refund will be processed automatically.

</p>

`

    );

};

module.exports =
orderCancelledTemplate;