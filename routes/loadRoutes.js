const express = require('express');
const router = express.Router();
const loadController = require('../controllers/loadController');
const auth = require('../middleware/authMiddleware'); // We will use 'auth' everywhere

// Route 1: Create a load (Public)
router.post('/', loadController.createLoad);

// Route 2: Get all loads (Admin)
router.get('/', auth, loadController.getAllLoads);

// Route 3: Assign driver (Admin)
router.put('/assign', auth, loadController.assignDriver);

// Route 4: Delete load (Admin)
router.delete('/:id', auth, loadController.deleteLoad);

// --- NEW DRIVER ROUTES ---

// Route 5: The driver fetches their own loads
router.get('/my-loads', auth, loadController.getMyLoads);

// Route 6: The driver updates a load to delivered
router.put('/deliver', auth, loadController.markAsDelivered);

module.exports = router;