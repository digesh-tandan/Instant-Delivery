const { pool } = require("../../config/database");

const calculateCartSummary = require("../cart/calculateCartSummary.service");

const generateOrderNumber = require("./helpers/generateOrderNumber.helper");

const validateAddress = require("./helpers/validateAddress.helper");

const validateCart = require("./helpers/validateCart.helper");

const validateStock = require("./helpers/validateStock.helper");

const createOrder = require("./helpers/createOrder.helper");

const createOrderItems = require("./helpers/createOrderItems.helper");

const createOrderHistory = require("./helpers/createOrderHistory.helper");

const recordCouponUsage = require("./helpers/recordCouponUsage.helper");

const updateInventory = require("./helpers/updateInventory.helper");

const clearCart = require("./helpers/clearCart.helper");

const ORDER_MESSAGES = require("../../constants/orderMessages");

const UserModel =
require("../../models/user.model");

const NotificationService =
require("../../services/notification");

const placeOrder = async (req) => {

    const connection = await pool.getConnection();

    try {

        await connection.beginTransaction();

        const {

            address_id,

            payment_method,

            notes

        } = req.body;

        const userId = req.user.id;

        const address = await validateAddress(

            address_id,

            userId

        );

        const {

            cart,

            items

        } = await validateCart(

            userId

        );

        await validateStock(

            items

        );

        const cartSummary = await calculateCartSummary(

            items,

            cart.coupon_id,

            userId

        );

        const orderNumber = await generateOrderNumber();
    
        const orderId = await createOrder(

            {

                order_number: orderNumber,

                user_id: userId,

                address_id: address.id,

                coupon_id: cart.coupon_id,

                subtotal: cartSummary.summary.sub_total,

                coupon_discount: cartSummary.summary.coupon_discount,

                delivery_charge: cartSummary.summary.delivery_charge,

                delivery_discount: cartSummary.summary.delivery_discount,

                handling_charge: cartSummary.summary.handling_charge,

                total_amount: cartSummary.summary.total_payable,

                payment_method,

                payment_status:

                    payment_method === "COD"

                        ? "PENDING"

                        : "PENDING",

                order_status: "PLACED",

                notes,

                created_by: userId

            },

            connection

        );

        await createOrderItems(

            orderId,

            items,

            connection

        );

        await createOrderHistory(

            orderId,

            "PLACED",

            userId,

            connection

        );

        await recordCouponUsage(

            cart.coupon_id,

            userId,

            orderId,

            cartSummary.summary.coupon_discount,

            connection

        );

        await updateInventory(

            items,

            connection

        );

        await clearCart(

            cart.id,

            userId,

            connection

        );

        await connection.commit();

        const user =
            await UserModel.findById(
            
                userId
            
            );
        
        if (user) {
        
            await NotificationService.sendOrderPlacedEmail(
            
                user.email,
            
                user.first_name,
            
                orderNumber,
            
                cartSummary.summary.total_payable
            
            );
        
        }

        return {

            order_id: orderId,

            order_number: orderNumber,

            payment_status: "PENDING",

            order_status: "PLACED"

        };

    }

    catch (error) {

        await connection.rollback();

        throw error;

    }

    finally {

        connection.release();

    }

};

module.exports = placeOrder;