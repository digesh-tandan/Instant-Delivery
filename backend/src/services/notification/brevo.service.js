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

    }

});

const sendMail =
async (

    to,

    subject,

    html

) => {

    console.log("MAIL_FROM:", process.env.MAIL_FROM);

    console.log(
        "FROM:",
        `"Instant Delivery" <${process.env.MAIL_FROM}>`
    );
    
    await transporter.sendMail({

        from:

            `"Instant Delivery" <${process.env.MAIL_FROM}>`,

        to,

        subject,

        html

    });

};

module.exports = {

    sendMail

};