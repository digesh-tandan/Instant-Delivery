const layoutTemplate =
require("./layout.template");

const loginAlertTemplate = (

    firstName,

    loginTime,

    ipAddress,

    device

) => {

    return layoutTemplate(

        "New Login Alert",

        `

<h2>

Hello ${firstName}

</h2>

<p>

A new login to your

<b>

Instant Delivery

</b>

account was detected.

</p>

<p>

<b>

Login Time

</b>

<br>

${loginTime}

</p>

<p>

<b>

IP Address

</b>

<br>

${ipAddress}

</p>

<p>

<b>

Device

</b>

<br>

${device}

</p>

<p>

If this login was performed by you,

no further action is required.

</p>

<p>

If you do not recognize this login,

please change your password immediately.

</p>

`

    );

};

module.exports =
loginAlertTemplate;