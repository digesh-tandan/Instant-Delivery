const CouponModel = require("../../models/coupon.model");

const validateCoupon = require("../coupon/validateCoupon.service");

const calculateCouponDiscount = require("../coupon/calculateCouponDiscount.service");

const DELIVERY_CHARGE = 30;

const MAX_HANDLING_CHARGE = 10;

const HANDLING_PERCENTAGE = 0.007;

const calculateCartSummary = async (

    cartItems,

    couponId = null,

    userId = null

) => {

    const totalItems = cartItems.length;

    const totalQuantity = cartItems.reduce(

        (sum, item) => sum + item.quantity,

        0

    );

    const subTotal = cartItems.reduce(

        (sum, item) => sum + Number(item.total_price),

        0

    );

    const handlingCharge = Math.min(

        MAX_HANDLING_CHARGE,

        Number(

            (subTotal * HANDLING_PERCENTAGE).toFixed(2)

        )

    );

    const deliveryCharge = DELIVERY_CHARGE;

    let couponDiscount = 0;

    let deliveryDiscount = 0;

    let appliedCoupon = null;

    if (couponId && userId) {

        try {
                
            const coupon = await CouponModel.findById(
            
                couponId
            
            );
        
            await validateCoupon(
            
                coupon,
            
                userId,
            
                subTotal
            
            );
        
            const couponResult =
        
                calculateCouponDiscount(
                
                    coupon,
                
                    subTotal,
                
                    deliveryCharge
                
                );
            
            couponDiscount =
            
                couponResult.coupon_discount;
            
            deliveryDiscount =
            
                couponResult.delivery_discount;
            
            appliedCoupon =
            
                couponResult.applied_coupon;
            
        }

        catch (error) {
        
            couponDiscount = 0;
        
            deliveryDiscount = 0;
        
            appliedCoupon = null;
        
        }

    }

    const totalPayable = Number(

        (

            subTotal +

            deliveryCharge +

            handlingCharge -

            couponDiscount -

            deliveryDiscount

        ).toFixed(2)

    );

    return {

        cart: cartItems,

        summary: {

            total_items: totalItems,

            total_quantity: totalQuantity,

            sub_total: Number(subTotal.toFixed(2)),

            delivery_charge: deliveryCharge,

            handling_charge: handlingCharge,

            coupon_discount: couponDiscount,

            delivery_discount: deliveryDiscount,

            total_payable: totalPayable,

            applied_coupon: appliedCoupon

        }

    };

};

module.exports = calculateCartSummary;