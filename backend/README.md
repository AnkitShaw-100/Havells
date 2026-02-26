# Aqua Delight Backend API

A Node.js/Express backend API for the Aqua Delight fish marketplace with MongoDB and JWT authentication.

## Features

- **User Authentication**: Register, login, profile management for customers
- **Admin Authentication**: Separate auth system for fish sellers (admins)
- **Admin Verification**: New admin accounts require verification before full access
- **JWT Token-based Authentication**: Secure authentication with 30-day token expiry
- **Password Hashing**: Bcrypt password encryption
- **Input Validation**: Express-validator for request validation
- **MongoDB Integration**: Mongoose ODM for database operations

## Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/aqua-delight
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

3. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## API Endpoints

### User Routes (`/api/auth`)

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  }
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get User Profile
```http
GET /api/auth/profile
Authorization: Bearer <token>
```

#### Update User Profile
```http
PUT /api/auth/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated",
  "phone": "9876543210",
  "password": "newpassword123"
}
```

### Admin Routes (`/api/admin`)

#### Register Admin (Fish Seller)
```http
POST /api/admin/register
Content-Type: application/json

{
  "name": "Jane Seller",
  "email": "jane@fishseller.com",
  "password": "password123",
  "phone": "1234567890",
  "businessName": "Fresh Fish Co.",
  "businessAddress": {
    "street": "456 Ocean Ave",
    "city": "Miami",
    "state": "FL",
    "zipCode": "33101",
    "country": "USA"
  },
  "businessLicense": "LICENSE-123456"
}
```

#### Login Admin
```http
POST /api/admin/login
Content-Type: application/json

{
  "email": "jane@fishseller.com",
  "password": "password123"
}
```

#### Get Admin Profile
```http
GET /api/admin/profile
Authorization: Bearer <token>
```

#### Update Admin Profile
```http
PUT /api/admin/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Updated",
  "phone": "9876543210",
  "businessName": "Premium Fish Co."
}
```

#### Admin Dashboard (Verified Only)
```http
GET /api/admin/dashboard
Authorization: Bearer <token>
```

## Database Models

### User Schema
- name (String, required)
- email (String, required, unique)
- password (String, required, hashed)
- phone (String)
- address (Object: street, city, state, zipCode, country)
- isActive (Boolean, default: true)
- timestamps (createdAt, updatedAt)

### Admin Schema
- name (String, required)
- email (String, required, unique)
- password (String, required, hashed)
- phone (String, required)
- businessName (String, required)
- businessAddress (Object: street, city, state, zipCode, country)
- businessLicense (String)
- isVerified (Boolean, default: false)
- isActive (Boolean, default: true)
- role (String, enum: ['admin', 'superadmin'], default: 'admin')
- timestamps (createdAt, updatedAt)

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Tokens are valid for 30 days.

### Token Types
- **User tokens**: Include `type: 'user'` in the payload
- **Admin tokens**: Include `type: 'admin'` in the payload

### Protected Routes
Include the JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Error Handling

All error responses follow this format:
```json
{
  "message": "Error description"
}
```

Validation errors include an array of error objects:
```json
{
  "errors": [
    {
      "msg": "Error message",
      "param": "field_name",
      "location": "body"
    }
  ]
}
```

## Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token expiration
- User/Admin type separation in tokens
- Account activation status checks
- Admin verification system
- Email validation
- Password minimum length (6 characters)

## Project Structure

```
backend/
├── config/
│   └── db.js              # MongoDB connection
├── middleware/
│   └── auth.js            # Authentication middleware
├── models/
│   ├── User.js            # User model
│   └── Admin.js           # Admin model
├── routes/
│   ├── auth.js            # User routes
│   └── admin.js           # Admin routes
├── .env                   # Environment variables
├── .gitignore             # Git ignore file
├── package.json           # Dependencies
└── server.js              # Main server file
```

## Next Steps

To extend this API, consider adding:
- Product/Fish management routes for admins
- Order management system
- Shopping cart functionality
- Payment integration
- Image upload for products
- Search and filtering
- Reviews and ratings
- Email verification
- Password reset functionality
- Admin approval workflow for new sellers

## License

ISC
