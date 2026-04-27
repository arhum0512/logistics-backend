const db = require('../config/db');

const createLoad = async (req, res) => {
    try {
        const { origin, destination, weight } = req.body;
        const quotePrice = weight * 2.5; 
        
        await db.query(
            'INSERT INTO loads (client_id, origin, destination, weight, quote, quote_price, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [1, origin, destination, weight, quotePrice, quotePrice, 'pending']
        );
        res.status(201).json({ message: 'Load created', load: { quote: quotePrice } });
    } catch (error) {
        console.error("Create Load Error:", error);
        res.status(500).json({ message: 'Server error creating load' });
    }
};

const getAllLoads = async (req, res) => {
    try {
        const [loads] = await db.query('SELECT * FROM loads ORDER BY id DESC');
        res.status(200).json(loads);
    } catch (error) {
        console.error("Get Loads Error:", error);
        res.status(500).json({ message: 'Error fetching loads' });
    }
};

const assignDriver = async (req, res) => {
    try {
        const { loadId, driverId } = req.body;
        await db.query(`UPDATE loads SET status = 'assigned', driver_id = '${driverId}' WHERE id = ${loadId}`);
        res.status(200).json({ message: 'Driver assigned successfully' });
    } catch (error) {
        console.error("Assign Driver Error:", error);
        res.status(500).json({ message: 'Error assigning driver' });
    }
};

const deleteLoad = async (req, res) => {
    try {
        const loadId = req.params.id; 
        await db.query('DELETE FROM loads WHERE id = ?', [loadId]);
        res.status(200).json({ message: 'Load deleted successfully' });
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ message: 'Error deleting load' });
    }
};

const getMyLoads = async (req, res) => {
    try {
        const driverId = req.user.id; 

        const [rows] = await db.query(
            `SELECT * FROM loads WHERE driver_id = ${driverId} AND status != 'delivered'`
        );
        
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching driver loads:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const markAsDelivered = async (req, res) => {
    const { loadId } = req.body;
    try {
        await db.query(
            `UPDATE loads SET status = 'delivered' WHERE id = ${loadId}`
        );
        res.status(200).json({ message: "Load marked as delivered successfully" });
    } catch (error) {
        console.error("Error updating load status:", error);
        res.status(500).json({ message: "Failed to update status" });
    }
};

module.exports = {
    createLoad,
    getAllLoads,
    assignDriver,
    deleteLoad,
    getMyLoads,
    markAsDelivered
};