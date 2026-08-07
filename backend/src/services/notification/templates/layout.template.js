const layoutTemplate = (

    title,

    content

) => {

    return `

<!DOCTYPE html>

<html>

<head>

<meta charset="UTF-8">

<title>${title}</title>

</head>

<body
    style="
        margin:0;
        padding:0;
        background:#f4f6f9;
        font-family:Arial,sans-serif;
    "
>

<table
    width="100%"
    cellspacing="0"
    cellpadding="0"
>

<tr>

<td align="center">

<table

    width="650"

    cellspacing="0"

    cellpadding="0"

    style="

        background:#ffffff;

        margin:40px auto;

        border-radius:12px;

        overflow:hidden;

        box-shadow:0 5px 20px rgba(0,0,0,.1);

    "

>

<tr>

<td

    style="

        background:#2563eb;

        color:white;

        padding:30px;

        text-align:center;

        font-size:28px;

        font-weight:bold;

    "

>

Instant Delivery

</td>

</tr>

<tr>

<td

    style="

        padding:40px;

        color:#333;

        font-size:15px;

        line-height:1.8;

    "

>

${content}

</td>

</tr>

<tr>

<td

    style="

        background:#f9fafb;

        padding:25px;

        text-align:center;

        color:#777;

        font-size:13px;

    "

>

© ${new Date().getFullYear()} Instant Delivery

<br>

Fast • Secure • Reliable

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>

`;

};

module.exports = layoutTemplate;