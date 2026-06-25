# 📚 Library Management System (Backend API)

A secure, RESTful backend application for a Library Management System built with Node.js, Express, and MongoDB. It supports Role-Based Access Control (RBAC) for two distinct roles: **Librarian** and **Member**.

## 🛠 Tech Stack
- **Backend:** Node.js + Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JSON Web Tokens (JWT)
- **Password Security:** bcrypt
- **Validation:** express-validator

---

## 🚀 Features & Architecture

### 1. Authentication & Security
- Secure registration and login endpoints.
- Passwords are automatically hashed using `bcrypt` before saving to the database.
- Route protection and authentication verified via JWT headers (`Bearer <token>`).

### 2. Role-Based Access Control (RBAC)
- **Librarian:** Full CRUD operations on books (`Add`, `Update`, `Delete`, `View`), and member management (`View Members`, `Delete Member`).
- **Member:** Can view books, borrow books, return books, and view their currently borrowed items.
- Strict restrictions prevent members from modifying inventory or deleting accounts.

---

## 📂 Project Structure
```text
library-management-system/
├── config/
│   └── db.js               # MongoDB connection logic
├── controllers/
│   ├── authController.js   # User registration & login handlers
│   ├── bookController.js   # Book CRUD handlers
│   └── memberController.js # Member actions & dashboard handlers
├── middleware/
│   ├── authMiddleware.js   # JWT verification middleware
│   ├── roleMiddleware.js   # RBAC permission middleware
│   └── errorMiddleware.js  # Centralized error handling
├── models/
│   ├── User.js             # User Schema (Librarian/Member)
│   ├── Book.js             # Book Schema (Inventory tracking)
│   └── Borrow.js           # Borrow Transactions Schema
├── routes/
│   ├── authRoutes.js       # Auth API endpoints
│   ├── bookRoutes.js       # Book & Borrow API endpoints
│   └── memberRoutes.js     # Librarian member management endpoints
├── validators/
│   └── validationRules.js  # Request data input sanitization
├── .env                    # Environment variables (Local only)
├── server.js               # Application entry point
└── package.json            # Scripts and dependencies