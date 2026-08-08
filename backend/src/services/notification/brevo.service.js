const {
    BrevoClient
} = require("@getbrevo/brevo");


const brevo =
    new BrevoClient({

        apiKey:
            process.env.BREVO_API_KEY,

        timeoutInSeconds:
            15,

        maxRetries:
            1

    });


const sendMail =
    async (

        to,

        subject,

        html,

        firstName = null

    ) => {

        try {

            console.log(
                "\n================================"
            );

            console.log(
                "Sending Email via Brevo API"
            );

            console.log(
                "To:",
                to
            );

            console.log(
                "From:",
                process.env.MAIL_FROM
            );

            console.log(
                "Subject:",
                subject
            );

            console.time(
                "Brevo Email"
            );


            const response =
                await brevo
                    .transactionalEmails
                    .sendTransacEmail({

                        sender: {

                            name:
                                process.env.MAIL_FROM_NAME ||
                                "Instant Delivery",

                            email:
                                process.env.MAIL_FROM

                        },

                        to: [

                            {

                                email: to,

                                ...(firstName
                                    ? {
                                        name: firstName
                                    }
                                    : {})

                            }

                        ],

                        subject,

                        htmlContent:
                            html

                    });


            console.timeEnd(
                "Brevo Email"
            );


            console.log(
                "✅ Email Sent Successfully"
            );

            console.log(
                "Message ID:",
                response.messageId
            );

            console.log(
                "================================\n"
            );


            return response;

        }

        catch (error) {

            console.timeEnd(
                "Brevo Email"
            );


            console.error(
                "\n❌ Brevo Email Sending Failed"
            );


            console.error(
                "Message:",
                error.message
            );


            console.error(
                "Status Code:",
                error.statusCode
            );


            console.error(
                "Response Body:",
                error.body
            );


            console.error(
                "================================\n"
            );


            throw new Error(

                error.message ||

                "Unable to send email."

            );

        }

    };


module.exports = {

    sendMail

};