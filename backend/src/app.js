const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");

const statusCodes = require("./constants/statusCodes");

// Routes
const authRoutes = require("./routes/auth/auth.routes");
const profileRoutes = require("./routes/profile/profile.routes");
const addressRoutes = require("./routes/address/address.routes");
const categoryRoutes = require("./routes/category/category.routes");
const productRoutes = require("./routes/product/product.routes");
const variantRoutes = require("./routes/product/variant.routes");
const productImageRoutes = require("./routes/product/productImage.routes");
const wishlistRoutes = require("./routes/wishlist/wishlist.routes");
const cartRoutes = require("./routes/cart/cart.routes");
const couponRoutes = require("./routes/coupon/coupon.routes");
const orderRoutes = require("./routes/order/order.routes");
const deliveryRoutes = require("./routes/delivery/delivery.routes");
const paymentRoutes = require("./routes/payment/payment.routes");
const deliveryPersonRoutes = require("./routes/delivery/deliveryPartnerApplications.routes");
const storeManagerApplicationRoutes =
require("./routes/storeManager/storeManagerApplications.routes");

// Middlewares
const notFound = require("./middleware/notFound.middleware");
const errorMiddleware = require("./middleware/error.middleware");

const app = express();

// Global Middlewares

app.use(
    cors({
        origin: function (origin, callback) {

            const allowedOrigins = [
                "http://localhost:5173",
                "http://127.0.0.1:5500",
                "http://localhost:5500",
                process.env.FRONTEND_URL
            ].filter(Boolean);

            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            console.error("CORS blocked:", origin);

            return callback(
                new Error(`CORS blocked for origin: ${origin}`)
            );
        },

        credentials: true,

        methods: [
            "GET",
            "POST",
            "PUT",
            "PATCH",
            "DELETE",
            "OPTIONS"
        ],

        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cookie"
        ]
    })
);

app.use(helmet());

app.use(morgan("dev"));

// Razorpay Webhook
// Must use raw body for signature verification

app.use(

    "/api/v1/pay/webhook",
    
    express.raw({type: "application/json"})

);

// JSON Parser

app.use(

    express.json()

);

// URL Encoded Parser

app.use(

    express.urlencoded({

        extended: true

    })

);

app.use(

    "/uploads",

    express.static(

        path.join(

            __dirname,

            "../uploads"

        )

    )

);

app.use(cookieParser());

// Health Check Route

app.get(

    "/api/v1/health",

    (req, res) => {

        return res.status(statusCodes.OK).json({

            success: true,

            message: "Server is running"

        });

    }

);

app.get("/", (req, res) => {

    res.status(200).json({

        success: true,

        message: "Instant Delivery Backend API",

        version: "1.0.0",

        health: "/api/v1/health",

        documentation: "/docs"

    });

});

// API Routes
app.use("/api/v1/auth",authRoutes);

app.use("/api/v1/users",profileRoutes);

app.use("/api/v1/add", addressRoutes);

app.use("/api/v1/cat",categoryRoutes);

app.use("/api/v1/prod",productRoutes);

app.use("/api/v1",variantRoutes);

app.use("/api/v1", productImageRoutes);

app.use("/api/v1/wish",wishlistRoutes);

app.use("/api/v1/cart",cartRoutes);

app.use("/api/v1/coupons",couponRoutes);

app.use("/api/v1/order",orderRoutes);

app.use("/api/v1/del",deliveryRoutes);

app.use("/api/v1/pay",paymentRoutes);

app.use("/api/v1/delivery",deliveryPersonRoutes);

app.use("/api/v1/store",storeManagerApplicationRoutes);

// Invalid URL
app.use(notFound);

// Global Error Handler
app.use(errorMiddleware);

module.exports = app;