const layoutTemplate =
require("./layout.template");

const accountSuspendedTemplate = (

    firstName

) => {

    return layoutTemplate(

        "Account Suspended",

        `

<h2>

Hello ${firstName}

</h2>

<p>

Your Instant Delivery account has been suspended by an administrator.

</p>

<p>

If you think this was a mistake, please contact our support team.

</p>

`

    );

};

module.exports =
accountSuspendedTemplate;