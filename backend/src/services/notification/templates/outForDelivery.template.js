const layoutTemplate =
require("./layout.template");

const outForDeliveryTemplate = (

    firstName,

    orderNumber

) => {

    return layoutTemplate(

        "Out For Delivery",

        `

<h2>

Hello ${firstName}

</h2>

<p>

Your order is now

<b>

Out For Delivery

</b>.

</p>

<p>

Order Number

<br>

<b>

${orderNumber}

</b>

</p>

<p>

Please keep your phone available.

</p>

`

    );

};

module.exports =
outForDeliveryTemplate;