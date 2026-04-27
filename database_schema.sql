-- Database Schema for LogisticsPro

-- 1. Users Table (Stores both Admins and Drivers)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'driver') DEFAULT 'driver',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Loads Table (Stores freight data and tracks assignments)
CREATE TABLE IF NOT EXISTS loads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT DEFAULT 1,
    driver_id INT DEFAULT NULL,
    origin VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    weight DECIMAL(10,2) NOT NULL,
    quote DECIMAL(10,2) NOT NULL,
    quote_price DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'assigned', 'delivered') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (driver_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Insert a default admin for testing purposes
INSERT INTO users (name, email, password, role) 
VALUES ('System Admin', 'admin@logisticspro.com', 'hashed_password_here', 'admin');