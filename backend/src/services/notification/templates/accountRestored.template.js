const layoutTemplate =
require("./layout.template");

const accountRestoredTemplate = (

    firstName

) => {

    return layoutTemplate(

        "Account Restored",

        `

<h2>

Welcome Back ${firstName} 👋

</h2>

<p>

Your Instant Delivery account has been restored successfully.

</p>

<p>

You can now login and continue shopping normally.

</p>

<p>

We're happy to have you back.

</p>

`

    );

};

module.exports =
accountRestoredTemplate;