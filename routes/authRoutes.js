const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');

// Route 1: Login (Does NOT need the security token)
router.post('/login', authController.login);

router.post('/register', authController.register);

// Route 2: Get Drivers (DOES need the security token)
router.get('/drivers', auth, authController.getAllDrivers);

module.exports = router;