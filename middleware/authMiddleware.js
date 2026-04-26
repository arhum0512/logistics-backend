const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // 1. Get token from header
    let token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // 2. If the token starts with "Bearer ", remove that part to get the raw token
    if (token.startsWith('Bearer ')) {
        token = token.split(' ')[1];
    }

    try {
        // 3. Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error("JWT Error:", err.message);
        res.status(401).json({ message: 'Token is not valid: ' + err.message });
    }
};