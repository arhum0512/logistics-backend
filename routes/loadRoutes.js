const express = require('express');
const router = express.Router();
const loadController = require('../controllers/loadController');
const auth = require('../middleware/authMiddleware');

// Route 1: Create a load (Public - no auth needed so customers can get quotes!)
router.post('/', loadController.createLoad);

// Route 2: Get all loads (Protected)
router.get('/', auth, loadController.getAllLoads);

// Route 3: Assign driver (Protected)
router.put('/assign', auth, loadController.assignDriver);

// Route 4: Delete load (Protected)
router.delete('/:id', auth, loadController.deleteLoad);

// Import the new functions from your controller
const { getMyLoads, markAsDelivered, ...otherExistingFunctions } = require('../controllers/loadController');

// The driver fetches their own loads
router.get('/my-loads', authMiddleware, getMyLoads);

// The driver updates a load to delivered
router.put('/deliver', authMiddleware, markAsDelivered);

module.exports = router;