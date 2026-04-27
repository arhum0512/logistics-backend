# 🚚 LogisticsPro: Fleet & Freight Management System

## 📑 Overview
LogisticsPro is a full-stack web application designed to streamline freight management and dispatch operations. It provides a centralized command center for administrators to create loads, assign them to fleet drivers, and manage personnel. Simultaneously, it offers a mobile-responsive, dark-mode-enabled portal for drivers to track their active assignments and confirm deliveries in real-time.

## ✨ Key Features

### 🛡️ Admin Command Center
* **Role-Based Access Control (RBAC):** Secure login exclusively for administrators.
* **Freight Management:** Create new loads with automated quoting based on weight and origin/destination data.
* **Dispatch Board:** View all pending, assigned, and delivered loads. Assign specific loads to registered drivers.
* **Fleet Management:** View all registered drivers. Includes a "Safety Lock" deletion feature that prevents admins from deleting drivers who currently have active loads.

### 📱 Driver Portal (Mobile-Ready)
* **Dedicated Driver Login:** Automatically routes users with the `driver` role to their specific dashboard.
* **Active Assignment Tracking:** Drivers only see the loads specifically assigned to their `driver_id`.
* **One-Click Delivery:** Drivers can mark loads as 'Delivered', instantly updating the Admin Command Center.
* **Persistent User Preferences:** Includes a local-storage-backed Light/Dark mode toggle for day and night driving conditions.

## 🛠️ Tech Stack
* **Frontend:** React.js, Vite, React Router, Lucide React (Icons).
* **Backend:** Node.js, Express.js.
* **Database:** MySQL (Hosted on **Aiven**).
* **Authentication:** JSON Web Tokens (JWT) & bcrypt for secure password hashing.
* **Deployment:** Fully deployed on **Render** (Both Client and API).

## 🔒 Environment Variables
To run this project locally, you will need to add the following environment variables to your `.env` file in the backend:

```env
PORT=5000
DB_HOST=your_aiven_host_url
DB_USER=your_aiven_username
DB_PASSWORD=your_aiven_password
DB_NAME=your_database_name
DB_PORT=your_aiven_port
JWT_SECRET=your_super_secret_jwt_key
```

## 📡 Core API Endpoints

**Authentication Routes (`/api/auth`)**
* `POST /register` - Register a new user (Admin/Driver)
* `POST /login` - Authenticate user and return JWT
* `GET /drivers` - Fetch all users with the 'driver' role

**Load Management Routes (`/api/loads`)**
* `POST /` - Create a new load
* `GET /` - Fetch all loads (Admin)
* `PUT /assign` - Assign a specific driver to a load
* `DELETE /:id` - Remove a load

**Driver-Specific Routes (`/api/loads`)**
* `GET /my-loads` - Fetch loads assigned to the currently authenticated driver
* `PUT /deliver` - Update load status to 'delivered'
* `DELETE /driver/:id` - Delete a driver (includes safety checks for active loads)

## 🚀 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/yourusername/logistics-pro.git](https://github.com/yourusername/logistics-pro.git)
   ```

2. **Install Backend Dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies:**
   ```bash
   cd frontend
   npm install
   ```

4. **Run the Application (Development Mode):**
   * Open one terminal for the backend: `cd backend && npm run dev`
   * Open a second terminal for the frontend: `cd frontend && npm run dev`