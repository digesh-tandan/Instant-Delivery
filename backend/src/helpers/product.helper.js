const calculateFinalPrice = (

    mrp,

    sellingPrice,

    offerType,

    offerValue,

    isOfferActive

) => {

    let finalPrice = Number(

        sellingPrice

    );

    if (

        isOfferActive

    ) {

        if (

            offerType === "percentage"

        ) {

            const discount =

                (Number(mrp) * Number(offerValue)) / 100;

            finalPrice -= discount;

        }

        else if (

            offerType === "flat"

        ) {

            finalPrice -= Number(

                offerValue

            );

        }

    }

    finalPrice = Math.max(

        0,

        finalPrice

    );

    return Number(

        finalPrice.toFixed(2)

    );

};

module.exports = {

    calculateFinalPrice

};