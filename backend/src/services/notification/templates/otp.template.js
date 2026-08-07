const layoutTemplate =
require("./layout.template");

const otpTemplate = (

    heading,

    message,

    otp

) => {

    return layoutTemplate(

        heading,

        `

<h2>

${heading}

</h2>

<p>

${message}

</p>

<div
    style="
        text-align:center;
        margin:35px 0;
    "
>

<span

    style="

        display:inline-block;

        padding:18px 40px;

        background:#2563eb;

        color:white;

        font-size:34px;

        font-weight:bold;

        letter-spacing:10px;

        border-radius:10px;

    "

>

${otp}

</span>

</div>

<p>

This OTP will expire in

<b>

10 Minutes

</b>

</p>

<p>

Please do not share this OTP with anyone.

</p>

`

    );

};

module.exports = otpTemplate;