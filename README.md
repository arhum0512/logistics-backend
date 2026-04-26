# LogisticsPro: Truck Dispatching Management System

A full-stack logistics management system for handling truck dispatch operations, fleet drivers, and load assignments. Built for the Professional Practices (PP) academic submission.

## 🚀 Features
- **Public Quote Generator:** Customers can submit load details and receive an instant price quote.
- **Driver Onboarding:** Secure registration and login system for fleet drivers.
- **Admin Dashboard:** Centralized command center to monitor all active, pending, and dispatched cargo.
- **Assignment System:** Assign available drivers to pending loads with real-time UI updates.
- **Full CRUD Operations:** Create loads, Read active loads/drivers, Update dispatch status, and Delete/cancel loads.
- **Security:** JSON Web Tokens (JWT) for route protection and Bcrypt for password hashing.
- **Theming:** Persistent Light/Dark mode via React State and LocalStorage.

## 🛠️ Technology Stack
- **Frontend:** React.js, Vite, React Router DOM, Lucide-React (Icons)
- **Backend:** Node.js, Express.js
- **Database:** MySQL 8.4
- **Security:** JWT (jsonwebtoken), Bcrypt.js

---

## ⚙️ Local Setup Instructions

### 1. Database Configuration
1. Open your MySQL Command Line or Workbench.
2. Create the database: `CREATE DATABASE truck_dispatch;`
3. Use the database: `USE truck_dispatch;`
4. Run the following SQL commands to set up the tables:

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'driver'
);

CREATE TABLE loads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT,
    origin VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    weight DECIMAL(10,2) NOT NULL,
    quote DECIMAL(10,2),
    quote_price DECIMAL(10,2),
    status VARCHAR(50) DEFAULT 'pending',
    driver_id INT,
    FOREIGN KEY (client_id) REFERENCES users(id),
    FOREIGN KEY (driver_id) REFERENCES users(id)
);