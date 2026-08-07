const layoutTemplate =
require("./layout.template");

const accountActivatedTemplate = (

    firstName

) => {

    return layoutTemplate(

        "Account Activated",

        `

<h2>

Hello ${firstName} 👋

</h2>

<p>

Your Instant Delivery account has been activated successfully.

</p>

<p>

You can now login and enjoy all our services.

</p>

`

    );

};

module.exports =
accountActivatedTemplate;