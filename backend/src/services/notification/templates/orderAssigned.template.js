const layoutTemplate =
require("./layout.template");

const orderAssignedTemplate = (

    firstName,

    orderNumber,

    deliveryPartner

) => {

    return layoutTemplate(

        "Delivery Partner Assigned",

        `

<h2>

Good News ${firstName} 🎉

</h2>

<p>

A delivery partner has been assigned to your order.

</p>

<table
    style="
        width:100%;
        border-collapse:collapse;
        margin-top:20px;
    "
>

<tr>

<td>

<b>

Order Number

</b>

</td>

<td>

${orderNumber}

</td>

</tr>

<tr>

<td>

<b>

Delivery Partner

</b>

</td>

<td>

${deliveryPartner}

</td>

</tr>

</table>

<p>

Your order will be picked up shortly.

</p>

`

    );

};

module.exports =
orderAssignedTemplate;