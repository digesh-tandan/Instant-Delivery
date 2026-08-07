const brevo =
require("@getbrevo/brevo");

const apiInstance =
new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(

    brevo.TransactionalEmailsApiApiKeys.apiKey,

    process.env.BREVO_API_KEY

);

const sendMail =
async (

    to,

    subject,

    html

) => {

    try {

        console.log("\n==============================");

        console.log("Sending Email");

        console.log("To:", to);

        console.log("Subject:", subject);

        console.time("Email");

        const result =
            await apiInstance.sendTransacEmail({

                sender: {

                    email:
                        process.env.MAIL_FROM,

                    name:
                        process.env.MAIL_FROM_NAME

                },

                to: [

                    {

                        email: to

                    }

                ],

                subject,

                htmlContent: html

            });

        console.timeEnd("Email");

        console.log("Email Sent Successfully");

        console.log(result.body);

        console.log("==============================\n");

        return result.body;

    }

    catch (error) {

        console.error("\nEmail Sending Failed");

        console.error(error.response?.body || error);

        throw new Error(

            error.response?.body?.message ||

            error.message ||

            "Unable to send email."

        );

    }

};

module.exports = {

    sendMail

};