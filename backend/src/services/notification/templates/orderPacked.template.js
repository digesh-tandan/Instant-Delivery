const layoutTemplate =
require("./layout.template");

const orderPackedTemplate = (

    firstName,

    orderNumber

) => {

    return layoutTemplate(

        "Order Packed",

        `

<h2>

Hello ${firstName}

</h2>

<p>

Great news!

</p>

<p>

Your order has been packed successfully.

</p>

<p>

Order Number

<br>

<b>

${orderNumber}

</b>

</p>

<p>

It is now waiting for a delivery partner.

</p>

`

    );

};

module.exports =
orderPackedTemplate;