const nodemailer =
require("nodemailer");

const transporter =
nodemailer.createTransport({

    host:
        process.env.MAIL_HOST,

    port:
        Number(process.env.MAIL_PORT),

    secure:
        false,

    auth: {

        user:
            process.env.MAIL_USER,

        pass:
            process.env.MAIL_PASS

    },

    tls: {

        rejectUnauthorized:
            false

    },

    connectionTimeout:
        10000,

    greetingTimeout:
        10000,

    socketTimeout:
        10000

});

// Verify SMTP connection when server starts

(async () => {

    try {

        await transporter.verify();

        console.log(
            "✅ Brevo SMTP Connected Successfully"
        );

    }

    catch (error) {

        console.error(
            "❌ Brevo SMTP Connection Failed"
        );

        console.error(error);

    }

})();

const sendMail =
async (

    to,

    subject,

    html

) => {

    try {

        console.log(
            "\n========== Sending Email =========="
        );

        console.log(
            "To:",
            to
        );

        console.log(
            "From:",
            `"Instant Delivery" <${process.env.MAIL_FROM}>`
        );

        console.log(
            "Subject:",
            subject
        );

        console.time(
            "Email Sent Time"
        );

        const info =
            await transporter.sendMail({

                from:
                    `"Instant Delivery" <${process.env.MAIL_FROM}>`,

                to,

                subject,

                html

            });

        console.timeEnd(
            "Email Sent Time"
        );

        console.log(
            "✅ Email Sent Successfully"
        );

        console.log(
            "Message ID:",
            info.messageId
        );

        console.log(
            "Accepted:",
            info.accepted
        );

        console.log(
            "Rejected:",
            info.rejected
        );

        console.log(
            "Response:",
            info.response
        );

        console.log(
            "===================================\n"
        );

        return info;

    }

    catch (error) {

        console.error(
            "\n❌ Email Sending Failed"
        );

        console.error(
            "Message:",
            error.message
        );

        console.error(
            "Code:",
            error.code
        );

        console.error(
            "Command:",
            error.command
        );

        console.error(
            "Response:",
            error.response
        );

        console.error(
            "Response Code:",
            error.responseCode
        );

        console.error(error);

        throw error;

    }

};

module.exports = {

    sendMail

};