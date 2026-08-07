const layoutTemplate =
require("./layout.template");

const accountDeletedTemplate = (

    firstName

) => {

    return layoutTemplate(

        "Account Deleted",

        `

<h2>

Goodbye ${firstName}

</h2>

<p>

Your Instant Delivery account has been deleted successfully.

</p>

<p>

We're sorry to see you leave.

</p>

<p>

If this deletion was accidental, you may restore your account during the recovery period.

</p>

`

    );

};

module.exports =
accountDeletedTemplate;