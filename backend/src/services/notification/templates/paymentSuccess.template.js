const layoutTemplate =
require("./layout.template");

const paymentSuccessTemplate = (

    orderNumber,

    amount

) => {

    return layoutTemplate(

        "Payment Successful",

        `

<h2>

Payment Successful ✅

</h2>

<p>

Your payment has been received successfully.

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

Amount Paid

</b>

</td>

<td>

₹${Number(amount).toFixed(2)}

</td>

</tr>

</table>

<p>

Your order has now been confirmed.

</p>

<p>

Thank you for shopping with

<b>

Instant Delivery

</b>

</p>

`

    );

};

module.exports =
paymentSuccessTemplate;