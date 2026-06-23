# Merchant Management REST API

A secure and robust production-ready backend system built with Node.js, Express, and MongoDB for managing merchant records and category groupings. Features secure JWT authentication with role-based route protection and automated merchant registration number generation.

---

## 🛠️ Tech Stack & Architecture

- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT)
- **Design Pattern:** Model-View-Controller (MVC)

---

## 📂 Project Structure

```text
├── config/             # Database connection setup
├── controllers/        # Request handling and business logic
├── middlewares/        # JWT validation and route protection
├── models/             # Mongoose schemas (Admin, Category, Merchant)
├── .env.example        # Blueprint configuration for environment variables
├── .gitignore          # Excludes node_modules and active secrets
├── index.js            # Server entry point and master configuration
├── package.json        # Project metadata and dependencies
└── routes.js           # API route mapping

```

---

## 🚀 Getting Started

Follow these steps to set up and run the application locally.

### 1. Prerequisites

Ensure you have the following installed on your machine:

* [Node.js](https://nodejs.org/) (v16.x or higher recommended)
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account or a local MongoDB instance running.

### 2. Installation

Extract the project folder, open your terminal in the root directory, and run the following command to install all dependencies:

```bash
npm install

```

### 3. Environment Configuration

1. Create a new file named `.env` in the root directory.
2. Copy the contents of `.env.example` into your new `.env` file and populate it with your specific configuration credentials:

```ini
PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_cryptographic_secret_key_here

```

### 4. Running the Server

To launch the application in development mode (with auto-reload):

```bash
node --watch index.js  

```


Upon a successful connection, your terminal will display:

```text
Server is running on port 5000
connected to DB successfully

```

---

## 📑 API Documentation

All request payloads must be sent with the header `Content-Type: application/json`. Protected routes require a valid admin JWT passed in the Authorization header as a Bearer Token (`Authorization: Bearer <token>`).

### Authentication Endpoints

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| **POST** | `/api/auth/register` | Public | Helper route to create an initial admin account |
| **POST** | `/api/auth/login` | Public | Validates admin credentials & returns a secure JWT token |

### Category Endpoints

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| **POST** | `/api/categories` | 🔒 Admin | Adds a new merchant category group |

### Merchant Endpoints

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| **POST** | `/api/merchants` | 🔒 Admin | Creates a merchant profile (Auto-generates Unique Reg No.) |
| **GET** | `/api/merchants` | 🔒 Admin | Fetches a populated list of all registered merchants |
| **GET** | `/api/merchants/:id` | 🔒 Admin | Fetches details of a single merchant using MongoDB `_id` |
| **PATCH** | `/api/merchants/edit/:id` | 🔒 Admin | Updates fields of a single merchant using MongoDB `_id` |
| **DELETE** | `/api/merchants/:id` | 🔒 Admin | Removes a merchant record from the database |

---

## 📮 Testing with Postman

An exported Postman collection containing complete request schemas, headers, and pre-recorded success responses is included in the project root directory:

`merchantMgmt.postman_collection.json`

### Import and Execute Instructions:

1. Open Postman and click **Import** in the top left corner.
2. Drag and drop the `.json` collection file listed above.
3. Execute the **Admin Login** endpoint first to generate your token.
4. Open the Collection's variables/authorization tab, or update your request authentication headers to pass the valid Bearer token for downstream protected endpoints.

