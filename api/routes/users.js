const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
const userController = require('../controllers/users');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:userId', userController.getUser);
router.patch('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

module.exports = router;