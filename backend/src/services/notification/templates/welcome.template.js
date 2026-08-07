const layoutTemplate =
require("./layout.template");

const welcomeTemplate = (

    firstName

) => {

    return layoutTemplate(

        "Welcome to Instant Delivery",

        `

<h2>

Hello ${firstName} 👋

</h2>

<p>

Your account has been verified successfully.

</p>

<p>

Welcome to

<b>

Instant Delivery

</b>

</p>

<p>

We are excited to have you with us.

</p>

<p>

Happy Shopping!

</p>

`

    );

};

module.exports =
welcomeTemplate;