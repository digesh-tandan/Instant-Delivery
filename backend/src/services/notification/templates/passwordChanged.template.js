const layoutTemplate =
require("./layout.template");

const passwordChangedTemplate = () => {

    return layoutTemplate(

        "Password Changed",

        `

<h2>

Password Changed Successfully

</h2>

<p>

Your password has been updated successfully.

</p>

<p>

If this wasn't you,

please contact our support team immediately.

</p>

`

    );

};

module.exports =
passwordChangedTemplate;