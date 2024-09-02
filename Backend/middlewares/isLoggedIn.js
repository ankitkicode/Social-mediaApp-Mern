// isLoggedIn.js middleware
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET;

const isLoggedIn = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; // Attach user info to request object
        // console.log("isLoggedIn file se ", decoded);
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid token.', error: err.message });
    }
};

module.exports = isLoggedIn;
