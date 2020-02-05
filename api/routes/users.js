const express = require('express');
const router = express.Router();

const userService = require('../services/users');

router.post('/signup', signup);
router.post('/login', login);
router.get('/', getAllUsers);
router.post('/', createUser);
router.get('/:userId', getUser);
router.patch('/:userId', updateUser);
router.delete('/:userId', deleteUser);

function signup(req, res, next){
    userService.signup(req,res,next);
}

function login(req, res, next){
    userService.login(req,res,next);
}

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