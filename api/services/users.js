const mongoose = require('mongoose');

const User = require('../models/users');

let service = {};

let getAllUsers = (req, res, next) => {
    User.find().exec()
    .then(data => {
        console.log(data);
        if (data.length >0) {
            res.status(200).json(data);   
        } else {
            res.status(200).json({
                message: 'No entries found'
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
};

let createUser = (req, res, next) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        last_name: req.body.last_name,
        first_name: req.body.first_name,
        email: req.body.email
    })
    console.log(user);    
    user.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Created successfully',
                user: user
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

let getUser = (req, res, next) => {
    const id = req.params.userId;
    User.findById(id).exec()
    .then(data => {
        console.log(data);
        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).json({
                message: 'No valid entry for the provided ID'
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

let updateUser = (req, res, next) => {
    if (req.body.email != null){
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
        res.status(200).json({
            message: 'Updated successfully'
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
};

let deleteUser = (req, res, next) => {
    const id = req.params.userId;
    User.remove({_id: id}).exec()
    .then(result => {
        res.status(200).json({
            message: 'Deleted successfully.'
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
};

service.getAllUsers = getAllUsers;
service.createUser = createUser;
service.getUser = getUser;
service.updateUser = updateUser;
service.deleteUser = deleteUser;

module.exports = service;