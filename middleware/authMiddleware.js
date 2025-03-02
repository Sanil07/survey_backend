const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.js');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');
    if(!token) return res.status(401).json({message: 'Unauthorized'});
    
    try {
        const decoded = jwt.verify(token, "12345678");
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({message: 'invalid token'});
    }
};

module.exports = authMiddleware;