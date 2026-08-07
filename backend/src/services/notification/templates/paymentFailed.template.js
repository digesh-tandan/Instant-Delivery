const layoutTemplate =
require("./layout.template");

const paymentFailedTemplate = (

    orderNumber,

    amount

) => {

    return layoutTemplate(

        "Payment Failed",

        `

<h2
    style="
        color:#dc2626;
    "
>

Payment Failed ❌

</h2>

<p>

Unfortunately,

your payment could not be completed.

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

Amount

</b>

</td>

<td>

₹${Number(amount).toFixed(2)}

</td>

</tr>

</table>

<p>

Don't worry.

Your order is still available.

</p>

<p>

You can retry the payment anytime from the application.

</p>

`

    );

};

module.exports =
paymentFailedTemplate;