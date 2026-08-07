const layoutTemplate =
require("./layout.template");

const orderConfirmedTemplate = (

    firstName,

    orderNumber

) => {

    return layoutTemplate(

        "Order Confirmed",

        `

<h2>

Hello ${firstName} 👋

</h2>

<p>

Your payment has been verified successfully.

</p>

<p>

Your order has now been

<b>

Confirmed

</b>.

</p>

<p>

<b>

Order Number

</b>

<br>

${orderNumber}

</p>

<p>

We have started preparing your order.

</p>

`

    );

};

module.exports =
orderConfirmedTemplate;