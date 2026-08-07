const layoutTemplate =
require("./layout.template");

const orderPlacedTemplate = (

    firstName,

    orderNumber,

    amount

) => {

    return layoutTemplate(

        "Order Placed",

        `

<h2>

Hello ${firstName} 👋

</h2>

<p>

Your order has been placed successfully.

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

Order Amount

</b>

</td>

<td>

₹${Number(amount).toFixed(2)}

</td>

</tr>

</table>

<p>

We have started preparing your order.

</p>

`

    );

};

module.exports =
orderPlacedTemplate;