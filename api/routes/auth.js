const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');

router.post('/signup', authController.signup);
router.get('/signup/activate/:token', authController.activate);
router.post('/login', authController.login);

module.exports = router;