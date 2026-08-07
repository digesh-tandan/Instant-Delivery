const layoutTemplate =
require("./layout.template");

const paymentRefundTemplate = (

    orderNumber,

    refundAmount

) => {

    return layoutTemplate(

        "Payment Refunded",

        `

<h2>

Refund Initiated 💰

</h2>

<p>

Your refund request has been processed successfully.

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

Refund Amount

</b>

</td>

<td>

₹${Number(refundAmount).toFixed(2)}

</td>

</tr>

</table>

<p>

The refund will be credited to your original payment method within
<b>

5-7 business days

</b>.

</p>

`

    );

};

module.exports =
paymentRefundTemplate;