const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../models/users');

exports.signup = (req, res, next) => {
    if (req.body.email === undefined || 
        req.body.password === undefined || req.body.password_confirmation === undefined ||
        req.body.password === "" || req.body.password_confirmation === "" ||
        req.body.password === null || req.body.password_confirmation === null) {
        return res.status(400).json({
            message: "Missing required fields: email, password, password_confirmation."
        });
    }  
    if (req.body.password !== req.body.password_confirmation) {
        return res.status(400).json({
            error: "Password and Password confiramtion does not match."
        })
    }
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        } else {
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                last_name: req.body.last_name,
                first_name: req.body.first_name,
                email: req.body.email,
                password: hash 
            });
            console.log(user);    
            user.save()
                .then(result => {
                    console.log(result);
                    return res.status(200).json({
                        message: 'Created successfully',
                        user: user
                    });
                })
                .catch(err => {
                    console.log(err);
                    return res.status(500).json({
                        error: err
                    });
                });
        }
    });
};

exports.login = (req, res, next) => {
    if (req.body.email === undefined || req.body.email === "" || 
        req.body.email === null || req.body.password === undefined || 
        req.body.password === "" || req.body.password === null) {
        return res.status(400).json({
            message: "Missing required fields: email, password."
        });
    } 
    User.findOne({email: req.body.email}).exec()
    .then(user => {
        if (user.length < 1) {
            return res.status(401).json({
                message: 'Login failed. Incorrect email or password.'
            });
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: 'Login failed. Incorrect email or password.'
                });
            }
            if (result) {
                return res.status(200).json({
                    message: 'Login successfully',
                    user: user
                });
            }
            return res.status(401).json({
                message: 'Login failed. Incorrect email or password.'
            });
        })
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    });
};
