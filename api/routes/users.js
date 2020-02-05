const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const userController = require('../controllers/users');

router.get('/', checkAuth, userController.getAllUsers);
router.post('/', checkAuth, userController.createUser);
router.get('/:userId', checkAuth, userController.getUser);
router.patch('/:userId', checkAuth, userController.updateUser);
router.delete('/:userId', checkAuth, userController.deleteUser);

module.exports = router;