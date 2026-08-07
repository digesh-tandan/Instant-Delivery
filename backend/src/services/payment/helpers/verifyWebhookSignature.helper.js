const crypto =
require("crypto");

const verifyWebhookSignature = (

    rawBody,

    signature

) => {

    if (

        !signature ||

        !process.env.RAZORPAY_WEBHOOK_SECRET

    ) {

        return false;

    }

    const expectedSignature =

        crypto

            .createHmac(

                "sha256",

                process.env.RAZORPAY_WEBHOOK_SECRET

            )

            .update(

                rawBody

            )

            .digest("hex");

    const expectedBuffer =

        Buffer.from(

            expectedSignature,

            "utf8"

        );

    const receivedBuffer =

        Buffer.from(

            signature,

            "utf8"

        );

    if (

        expectedBuffer.length !==

        receivedBuffer.length

    ) {

        return false;

    }

    return crypto.timingSafeEqual(

        expectedBuffer,

        receivedBuffer

    );

};

module.exports =
verifyWebhookSignature;