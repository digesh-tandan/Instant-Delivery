const calculateCouponDiscount = (

    coupon,

    subTotal,

    deliveryCharge

) => {

    let couponDiscount = 0;

    if (

        coupon.benefit_type === "DISCOUNT" ||

        coupon.benefit_type === "DISCOUNT_AND_FREE_DELIVERY"

    ) {

        if (coupon.discount_type === "FLAT") {

            couponDiscount = Number(

                coupon.discount_value

            );

        }

        else {

            couponDiscount =

                (

                    subTotal *

                    Number(coupon.discount_value)

                ) / 100;

            if (

                coupon.maximum_discount != null

            ) {

                couponDiscount = Math.min(

                    couponDiscount,

                    Number(

                        coupon.maximum_discount

                    )

                );

            }

        }

    }

    let deliveryDiscount = 0;

    if (

        coupon.benefit_type === "FREE_DELIVERY" ||

        coupon.benefit_type === "DISCOUNT_AND_FREE_DELIVERY"

    ) {

        if (coupon.free_delivery) {

            deliveryDiscount = deliveryCharge;

        }

        if (

            coupon.maximum_delivery_discount != null

        ) {

            deliveryDiscount = Math.min(

                deliveryDiscount,

                Number(

                    coupon.maximum_delivery_discount

                )

            );

        }

    }

    return {

        coupon_discount: Number(

            couponDiscount.toFixed(2)

        ),

        delivery_discount: Number(

            deliveryDiscount.toFixed(2)

        ),

        applied_coupon: {

            id: coupon.id,

            code: coupon.code,

            title: coupon.title

        }

    };

};

module.exports = calculateCouponDiscount;