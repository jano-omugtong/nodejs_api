const express = require('express');
const router = express.Router();

const userService = require('../services/users');

router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:userId', getUser);
router.patch('/:userId', updateUser);
router.delete('/:userId', deleteUser);

function getAllUsers(req, res, next){
    userService.getAllUsers(req,res,next);
}

function createUser(req, res, next){
    userService.createUser(req,res,next);
}

function getUser(req, res, next){
    userService.getUser(req,res,next);
}

function updateUser(req, res, next){
    userService.updateUser(req,res,next);
}

function deleteUser(req, res, next){
    userService.deleteUser(req,res,next);
}

module.exports = router;