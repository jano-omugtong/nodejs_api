const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const config = require('../../config');
const User = require('../models/users');

exports.getAllUsers = (req, res, next) => {
    console.log(req);
    User.find().exec()
    .then(data => {
        console.log(data);
        if (data.length >0) {
            return res.status(200).json(data);   
        } else {
            return res.status(200).json({
                message: 'No entries found'
            });
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({
            error: err
        })
    })
};

exports.createUser = (req, res, next) => {
    bcrypt.hash(config.defaultPass, 10, (err, hash) => {
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
            })
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

exports.getUser = (req, res, next) => {
    const id = req.params.userId;
    User.findById(id).exec()
    .then(data => {
        console.log(data);
        if (data) {
            return res.status(200).json(data);
        } else {
            return res.status(404).json({
                message: 'No valid entry for the provided ID'
            });
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    });
};

exports.updateUser = (req, res, next) => {
    if (req.body.email != null || req.body.id != null){
        return res.status(400).json({
            message: "ID and email cannot be edited."
        });
    }    

    const id = req.params.userId;
    let userUpdate = {};
    for (let i in req.body) {
        userUpdate[i] = req.body[i];
    }
    
    User.updateOne({_id: id}, {$set: userUpdate}).exec()
    .then(data => {
        return res.status(200).json({
            message: 'Updated successfully'
        });
    })
    .catch(err => {
        return res.status(500).json({
            error: 'No valid entry for the provided ID'
        });
    });
};

exports.deleteUser = (req, res, next) => {
    const id = req.params.userId;
    User.remove({_id: id}).exec()
    .then(result => {
        return res.status(200).json({
            message: 'Deleted successfully.'
        });
    })
    .catch(err => {
        return res.status(500).json({
            error: 'No valid entry for the provided ID'
        });
    });
};