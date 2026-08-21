# 🚀 Instant Delivery

A full-stack **instant delivery / quick-commerce web application** inspired by platforms like Blinkit, Zepto, and Swiggy Instamart.

The project provides a foundation for online grocery and daily-essentials delivery with customer authentication, OTP verification, password management, profile management, refresh-token authentication, and administrative user management.

---

## 🌐 Live Demo

| Platform              | URL                                                |
| --------------------- | -------------------------------------------------- |
| **Frontend**          | https://instantdelivery.vercel.app/                |
| **Backend API**       | https://instant-delivery-1.onrender.com |
| **GitHub Repository** | https://github.com/digesh-tandan/Instant-Delivery  |

---

## 📌 Project Overview

**Instant Delivery** is a full-stack web application built using a modern client-server architecture.

The application consists of:

* A frontend web application for customer interaction
* A RESTful backend API for business logic
* MySQL for persistent data storage
* JWT-based authentication
* Refresh-token based session management
* OTP-based email verification
* Password recovery and management
* Admin/user management

The backend follows a modular **MVC + Service Layer architecture** to keep routes, controllers, business logic, and database operations separated.

---

## ✨ Key Features

### 👤 Customer

* User registration
* OTP-based registration verification
* User login/logout
* JWT authentication
* Refresh token authentication
* Forgot password
* Reset password through OTP
* Change password
* Update profile
* Resend OTP with cooldown
* Protected API routes

### 🔐 Authentication

* Access tokens using JWT
* Refresh-token based sessions
* Secure password hashing
* OTP generation and verification
* OTP expiration and cleanup
* Email-based OTP delivery
* Authentication middleware

### 👨‍💼 Admin

* Admin authentication
* Protected admin routes
* User management

### 🛒 Delivery Platform Foundation

The architecture is designed to support:

* Products
* Categories
* Cart
* Orders
* Delivery assignments
* Addresses
* Inventory
* Payments
* Order tracking

---

# 🛠️ Tech Stack

## Frontend

* **React**
* **JavaScript**
* **HTML5**
* **CSS3**
* **Vite**
* **Axios**

## Backend

* **Node.js**
* **Express.js**
* **JavaScript**
* **MySQL**
* **JWT**
* **Nodemailer**
* **bcrypt**
* **dotenv**
* **CORS**

## Development & Deployment

* **Git & GitHub** — Version control
* **Vercel** — Frontend deployment
* **Render** — Backend deployment
* **MySQL** — Relational database
* **Cloudinary** - Image/Video Upload
* **Razorpay** - Online Payments
* **Database** - MySQL/TiBD Online


---

# 🏗️ Architecture

```text
                    ┌───────────────┐
                    │    Browser    │
                    └───────┬───────┘
                            │
                            ▼
                    ┌───────────────┐
                    │   Frontend    │
                    │ React + Vite  │
                    └───────┬───────┘
                            │ REST API
                            ▼
                    ┌───────────────┐
                    │    Backend    │
                    │ Node + Express│
                    └───────┬───────┘
                            │
               ┌────────────┼────────────┐
               ▼            ▼            ▼
           ┌───────┐   ┌──────────┐  ┌────────┐
           │ MySQL │   │Nodemailer│  │  JWT   │
           └───────┘   └──────────┘  └────────┘
```

---

# 📁 Project Structure

```text
Instant-Delivery/
│
├── backend/
│   ├── certs/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   │   ├── admin/
│   │   │   └── auth/
│   │   ├── helpers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   │   ├── admin/
│   │   │   └── auth/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── validations/
│   │   └── app.js
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   └── ...
│
├── index2.html
└── README.md
```

---

# 🔐 Authentication Flow

### Registration

```text
Register
   ↓
Validate Data
   ↓
Save Pending Registration
   ↓
Generate OTP
   ↓
Send OTP via Email
   ↓
Verify OTP
   ↓
Create User
   ↓
Account Activated
```

### Login

```text
Login
  ↓
Validate Credentials
  ↓
Generate Access Token
  +
Generate Refresh Token
  ↓
Authenticated Session
```

### Forgot Password

```text
Forgot Password
      ↓
Enter Email
      ↓
OTP Sent
      ↓
Verify OTP
      ↓
Reset Password
```

---

# 🗄️ Database

The project uses **MySQL** as the primary relational database.

Important tables include:

```text
users
otp
pendingRegistration
refresh_tokens
delivery_assignment
```

The database layer is accessed through dedicated models and services.

---

# ⚡ Quick Start — Local Development

## 1. Prerequisites

Make sure you have installed:

* Node.js
* npm
* MySQL
* Git

Check versions:

```bash
node -v
npm -v
mysql --version
git --version
```

---

## 2. Clone Repository

```bash
git clone https://github.com/digesh-tandan/Instant-Delivery.git
cd Instant-Delivery
```

---

## 3. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file using:

```text
.env.example
```

Configure your:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=instant_delivery

JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret

MAIL_HOST=your_smtp_host
MAIL_PORT=your_smtp_port
MAIL_USER=your_email
MAIL_PASSWORD=your_email_password
MAIL_FROM=your_email
```

> Use the exact variable names provided in `backend/.env.example`.

---

## 4. Database Setup

Start MySQL and create the database:

```sql
CREATE DATABASE instant_delivery;
```

Configure the database credentials in your backend `.env` file.

Make sure the required project tables are created before starting the application.

---

## 5. Start Backend

From the `backend` directory:

```bash
npm start
```

For development, if available:

```bash
npm run dev
```

Backend:

```text
http://localhost:5000
```

---

## 6. Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# 🔗 Local Application

```text
Frontend
http://localhost:5173
        │
        │ REST API
        ▼
Backend
http://localhost:5000
        │
        ▼
MySQL
```

---

# 🚀 Deployment

### Frontend

Deployed on **Vercel**

```text
https://instantdelivery.vercel.app/
```

### Backend

Deployed on **Render**

```text
https://instant-delivery-backend-e2lq.onrender.com
```

### Source Code

Hosted on **GitHub**

```text
https://github.com/digesh-tandan/Instant-Delivery
```

---

# 🔒 Security

The application follows several security practices:

* JWT authentication
* Refresh-token authentication
* Password hashing
* Protected routes
* OTP expiration
* OTP cleanup
* OTP resend cooldown
* Environment-based secrets
* CORS configuration
* Server-side validation

**Never commit your `.env` file or production credentials to GitHub.**

---

# 🧪 Testing the Application

After starting the application:

1. Register a new account.
2. Verify the registration OTP.
3. Login with the registered credentials.
4. Test profile management.
5. Test change-password functionality.
6. Test forgot-password and OTP recovery.
7. Test logout.
8. Test refresh-token authentication.
9. Test authorized admin functionality.

---

# 🔮 Future Enhancements

Planned/possible extensions include:

* 🛍️ Product catalogue
* 🛒 Shopping cart
* 📦 Order management
* 💳 Online payments
* 📍 Address & location management
* 🚴 Delivery partner module
* 📡 Real-time order tracking
* 📊 Admin dashboard
* 📦 Inventory management
* 🎟️ Coupons & offers
* ⭐ Ratings & reviews
* 🔔 Notifications

---

# 👨‍💻 Developer

## Digesh Kumar Tandan

**MCA Student | Full-Stack Developer**

Focused on building scalable web applications and backend systems using modern technologies.

### Technical Interests

* Full-Stack Development
* Backend Development
* REST APIs
* Node.js & Express.js
* React
* MySQL
* JavaScript
* Authentication & Authorization
* Database Design

---

## 🔗 Project Links

**GitHub:**
https://github.com/digesh-tandan/Instant-Delivery

**Live Frontend:**
https://instantdelivery.vercel.app/

**Live Backend:**
https://instant-delivery-backend-e2lq.onrender.com

---

## 📄 License

This project is developed for **educational, portfolio, and demonstration purposes**.

---

<p align="center">
  <strong>🚀 Instant Delivery</strong><br>
  Fast • Secure • Scalable
</p>
