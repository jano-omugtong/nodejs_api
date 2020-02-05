const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
const checkAuth = require('../middleware/check-auth');

router.post('/signup', authController.signup);
router.get('/signup/activate/:token', authController.activate);
router.post('/login', authController.login);
router.post('/changepass/:userId', checkAuth, authController.changePassword);

module.exports = router;