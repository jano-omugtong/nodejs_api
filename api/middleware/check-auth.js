const jwt = require('jsonwebtoken');

const authController = require('../controllers/auth');
const config = require('../../config');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, config.jwtKey);
        req.userData = decoded;
        next();
    } catch (error) {
        if (req.method === 'GET' && req.originalUrl === '/users'){
            authController.getAllUsers(req, res, next);
        } else {
            return res.status(401).json({
                message: 'Unauthenticated'
            });
        }
    }
};