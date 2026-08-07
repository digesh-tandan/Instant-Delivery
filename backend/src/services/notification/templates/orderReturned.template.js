const layoutTemplate =
require("./layout.template");

const orderReturnedTemplate = (

    firstName,

    orderNumber

) => {

    return layoutTemplate(

        "Order Returned",

        `

<h2>

Hello ${firstName}

</h2>

<p>

Your order has been marked as returned.

</p>

<p>

Order Number

<br>

<b>

${orderNumber}

</b>

</p>

<p>

Your refund has been initiated successfully.

</p>

`

    );

};

module.exports =
orderReturnedTemplate;