const layoutTemplate =
require("./layout.template");

const orderPickedUpTemplate = (

    firstName,

    orderNumber

) => {

    return layoutTemplate(

        "Order Picked Up",

        `

<h2>

Hello ${firstName}

</h2>

<p>

Your order has been picked up from the store.

</p>

<p>

Order Number

<br>

<b>

${orderNumber}

</b>

</p>

<p>

It is now on its way.

</p>

`

    );

};

module.exports =
orderPickedUpTemplate;