const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/db'); 

// --- 1. LOGIN FUNCTION ---
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: user.id, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: '24h' }
        );

        res.status(200).json({ 
            token, 
            user: { id: user.id, name: user.name, email: user.email, role: user.role } 
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

// --- 2. GET ALL DRIVERS FUNCTION ---
const getAllDrivers = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT id, name, email, role FROM users WHERE role = 'driver'");
        res.status(200).json(rows); // Send 'rows' (the actual data) to the frontend
    } catch (error) {
        console.error("Error fetching drivers:", error);
        res.status(500).json({ message: "Server error" });
    }
};
// --- 3. REGISTER DRIVER FUNCTION ---
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // 1. Check if the email is already in use
        const [existing] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // 2. Hash the password for security
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Save the new driver to the database
        await db.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', 
            [name, email, hashedPassword, 'driver']
        );

        res.status(201).json({ message: 'Driver registered successfully!' });
    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

// --- FOOLPROOF EXPORT ---
// This guarantees the router can see these functions!
module.exports = {
    login,
    getAllDrivers,
    register
};