const layoutTemplate =
require("./layout.template");

const orderDeliveredTemplate = (

    firstName,

    orderNumber

) => {

    return layoutTemplate(

        "Order Delivered",

        `

<h2>

Hello ${firstName} 🎉

</h2>

<p>

Your order has been delivered successfully.

</p>

<p>

<b>

Order Number

</b>

<br>

${orderNumber}

</p>

<p>

Thank you for shopping with
<b>

Instant Delivery

</b>.

</p>

<p>

We hope to serve you again soon.

</p>

`

    );

};

module.exports =
orderDeliveredTemplate;