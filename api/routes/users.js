const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Read all users'
    });
});

router.post('/', (req, res, next) => {
    const user = {
        email: req.body.email,
        last_name: req.body.last_name,
        first_name: req.body.first_name
    }
    res.status(200).json({
        message: 'Create user',
        user: user
    });
});

router.get('/:userId', (req, res, next) => {
    // const id = req.params.userId;
    // if (id === 'special') {
    //     res.status(200).json({
    //         message: 'Its special',
    //         id: id
    //     }); 
    // } else {
    //     res.status(200).json({
    //         message: 'You passed id'
    //     });
    // }
    res.status(200).json({
        message: 'Read user'
    });
});

router.patch('/:userId', (req, res, next) => {
    res.status(200).json({
        message: 'Update user'
    });
});

router.delete('/:userId', (req, res, next) => {
    res.status(200).json({
        message: 'Delete user'
    });
});

module.exports = router;