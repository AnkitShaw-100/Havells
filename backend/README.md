# Aqua Delight - Backend API

A comprehensive Node.js/Express backend API for an online fish marketplace platform connecting fish sellers with customers.

---

## Features

* User Authentication - JWT-based authentication for users and fish sellers
* Fish Seller Management - Dedicated seller registration and profile management
* Product Listings - Fish sellers can list products with freshness indicators
* Shopping Cart - Full cart functionality for users
* Order Management - Complete order lifecycle from creation to delivery
* Role-Based Access Control - Separate routes for users and sellers

---

## Tech Stack

* Runtime: Node.js v20.19.0
* Framework: Express.js v5.2.1
* Database: MongoDB with Mongoose v9.2.2
* Authentication: JWT (jsonwebtoken v9.0.3)
* Password Hashing: bcryptjs v3.0.3
* Validation: express-validator v7.3.1
* Environment: dotenv v17.3.1

---

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd 28_Aqua-Delight/backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the backend root:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### 4. Start the server

```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

---

## API Endpoints

Base URL:

```
http://localhost:5000/api
```

---

## AUTH ROUTES - `/api/auth` (Users)

| Method | Endpoint    | Protection       | Description                                |
| ------ | ----------- | ---------------- | ------------------------------------------ |
| POST   | `/register` | Public           | Register new user with email & password    |
| POST   | `/login`    | Public           | Login user and get JWT token               |
| GET    | `/profile`  | Protected (User) | Get authenticated user's profile           |
| PUT    | `/profile`  | Protected (User) | Update user profile (name, phone, address) |

### Registration Body

```json
{
  "email": "user@example.com",
  "password": "Password123"
}
```

### Login Body

```json
{
  "email": "user@example.com",
  "password": "Password123"
}
```

### Update Profile Body

```json
{
  "name": "John Doe",
  "phone": "+1-555-0101",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

---

## ADMIN ROUTES - `/api/admin` (Fish Sellers)

| Method | Endpoint     | Protection                   | Description                                    |
| ------ | ------------ | ---------------------------- | ---------------------------------------------- |
| POST   | `/register`  | Public                       | Register new fish seller with email & password |
| POST   | `/login`     | Public                       | Login fish seller and get JWT token            |
| GET    | `/profile`   | Protected (Admin)            | Get authenticated seller's profile             |
| PUT    | `/profile`   | Protected (Admin)            | Update seller profile & business details       |
| GET    | `/dashboard` | Protected (Admin + Verified) | Access seller dashboard                        |

### Registration Body

```json
{
  "email": "seller@example.com",
  "password": "Seller123"
}
```

### Update Profile Body

```json
{
  "name": "Rajesh Kumar",
  "phone": "+91-9876543210",
  "businessName": "Ocean Fresh Seafood",
  "businessAddress": {
    "street": "78 Dock Road",
    "city": "Kochi",
    "state": "Kerala",
    "zipCode": "682001",
    "country": "India"
  },
  "businessLicense": "KL-FISH-2026-456"
}
```

---

## FISH ROUTES - `/api/fish` (Product Listings)

| Method | Endpoint        | Protection        | Description                               |
| ------ | --------------- | ----------------- | ----------------------------------------- |
| GET    | `/`             | Public            | Get all available fish items              |
| GET    | `/search`       | Public            | Search fish by freshness, category, price |
| GET    | `/:id`          | Public            | Get single fish item details              |
| POST   | `/`             | Protected (Admin) | Add new fish item to catalog              |
| GET    | `/seller/items` | Protected (Admin) | Get seller's fish items                   |
| PUT    | `/:id`          | Protected (Admin) | Update fish item (owner only)             |
| DELETE | `/:id`          | Protected (Admin) | Delete fish item (owner only)             |

### Add Fish Body

```json
{
  "name": "King Salmon",
  "description": "Premium quality Atlantic salmon, wild-caught",
  "category": "Salt Water",
  "price": 850,
  "quantity": 15,
  "unit": "kg",
  "freshness": "Super Fresh (Today)",
  "harvestDate": "2026-02-26",
  "origin": "Norway"
}
```

### Search Parameters

* freshness: Super Fresh (Today), Fresh (1-2 Days), Good (2-3 Days), Average (3-4 Days)
* category: Fresh Water, Salt Water, Shell Fish, Other
* minPrice: Number (e.g., 300)
* maxPrice: Number (e.g., 1000)

Example:

```
/api/fish/search?freshness=Super Fresh (Today)&category=Salt Water&minPrice=500&maxPrice=1000
```

---

## CART ROUTES - `/api/cart` (Shopping Cart)

| Method | Endpoint   | Protection       | Description                    |
| ------ | ---------- | ---------------- | ------------------------------ |
| POST   | `/`        | Protected (User) | Add item to cart               |
| GET    | `/`        | Protected (User) | Get user's cart with all items |
| PUT    | `/:fishId` | Protected (User) | Update item quantity in cart   |
| DELETE | `/:fishId` | Protected (User) | Remove specific item from cart |
| DELETE | `/`        | Protected (User) | Clear entire cart              |

### Add to Cart Body

```json
{
  "fishId": "507f1f77bcf86cd799439011",
  "quantity": 2
}
```

### Update Quantity Body

```json
{
  "quantity": 5
}
```

---

## ORDER ROUTES - `/api/order` (Orders & Checkout)

### User Routes

| Method | Endpoint       | Protection       | Description                |
| ------ | -------------- | ---------------- | -------------------------- |
| POST   | `/`            | Protected (User) | Create order from cart     |
| GET    | `/`            | Protected (User) | Get all user's orders      |
| GET    | `/:id`         | Protected (User) | Get specific order details |
| PUT    | `/:id/payment` | Protected (User) | Update payment status      |
| DELETE | `/:id`         | Protected (User) | Cancel order (if eligible) |

### Create Order Body

```json
{
  "deliveryAddress": {
    "street": "123 Main Street",
    "city": "Mumbai",
    "state": "MH",
    "zipCode": "400001",
    "country": "India"
  },
  "phoneNumber": "+91-9876543210",
  "paymentMethod": "Cash on Delivery",
  "notes": "Deliver in morning"
}
```

### Update Payment Status Body

```json
{
  "paymentStatus": "Completed"
}
```

### Seller/Admin Routes

| Method | Endpoint        | Protection        | Description                              |
| ------ | --------------- | ----------------- | ---------------------------------------- |
| GET    | `/seller/items` | Protected (Admin) | Get all orders containing seller's items |
| PUT    | `/:id/status`   | Protected (Admin) | Update order status                      |

### Update Order Status Body

```json
{
  "status": "Confirmed"
}
```

Available Statuses:
Pending, Confirmed, Processing, Shipped, Delivered, Cancelled

---

## Authentication

All protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

Token Types:

* User Token: For `/api/auth/*`, `/api/cart/*`, `/api/order/*` routes
* Admin Token: For `/api/admin/*`, `/api/fish/*` routes

---

## Data Models

### User

* email (required, unique)
* password (required, hashed)
* name (optional)
* phone (optional)
* address (optional)
* isActive (default: true)

### Admin (Fish Seller)

* email (required, unique)
* password (required, hashed)
* name (optional)
* phone (optional)
* businessName (optional)
* businessAddress (optional)
* businessLicense (optional)
* isVerified (default: false)
* isActive (default: true)
* role (default: admin)

### Fish

* sellerId (ref: Admin, required)
* name (required)
* description (required)
* category (required)
* price (required)
* quantity (required)
* unit (default: kg)
* freshness (required)
* harvestDate (required)
* image (optional)
* origin (optional)
* isAvailable (default: true)

### Cart

* userId (ref: User, required)
* items
* totalPrice

### Order

* orderId
* userId
* items
* totalPrice
* deliveryAddress
* phoneNumber
* status
* paymentMethod
* paymentStatus
* trackingNumber
* notes

---

## Project Structure

```text
backend/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── .env
├── package.json
├── server.js
└── README.md
```

## Environment Variables

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/aqua-delight
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```

## API Summary

Total Routes: 32

| Feature | Public | User Protected | Admin Protected |
| ------- | ------ | -------------- | --------------- |
| Auth    | 2      | 2              | -               |
| Admin   | 2      | -              | 3               |
| Fish    | 3      | -              | 4               |
| Cart    | -      | 5              | -               |
| Order   | -      | 5              | 2               |

---

## Author

Aqua Delight Backend API - Fish Marketplace Platform

---

