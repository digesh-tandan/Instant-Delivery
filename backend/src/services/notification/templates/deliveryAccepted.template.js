const layoutTemplate =
require("./layout.template");

const deliveryAcceptedTemplate = (

    firstName,

    orderNumber,

    partnerName

) => {

    return layoutTemplate(

        "Delivery Accepted",

        `

<h2>

Hello ${firstName}

</h2>

<p>

${partnerName}

has accepted your delivery request.

</p>

<p>

Order Number

<br>

<b>

${orderNumber}

</b>

</p>

<p>

The partner will reach the store shortly.

</p>

`

    );

};

module.exports =
deliveryAcceptedTemplate;