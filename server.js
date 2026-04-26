const express = require('express');
const cors = require('cors');
require('dotenv').config();
console.log("SECRET LOADED CHECK:", process.env.JWT_SECRET);
const db = require('./config/db');

// --- IMPORT ROUTES ---
const authRoutes = require('./routes/authRoutes');
const loadRoutes = require('./routes/loadRoutes'); // NEW

const app = express();

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- USE ROUTES ---
app.use('/api/auth', authRoutes);
app.use('/api/loads', loadRoutes); // NEW

app.get('/', (req, res) => {
    res.send('Truck Dispatch API is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});