const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require("crypto");

const User = require('../models/users');
const config = require('../../config');
const emailService = require('../services/nodemailer');

const credentials = {
    client: {
      id: '555',
      secret: 'sikreto'
    },
    auth: {
      tokenHost: 'https://api.oauth.com'
    }
  };

  const oauth2 = require('simple-oauth2').create(credentials);

/**
 * Create user
 *
 * @param  [string] last_name
 * @param  [string] first_name
 * @param  [string] email
 * @param  [string] password
 * @param  [string] password_confirmation
 * @return [string] message
 */
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
            let activation_token = crypto.randomBytes(20).toString('hex');
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                last_name: req.body.last_name,
                first_name: req.body.first_name,
                email: req.body.email,
                password: hash,
                activation_token: activation_token
            });
            console.log(user);    
            user.save()
                .then(result => {
                    console.log(result);
                    const mailContent = `
                        <h3>Thank you for signing up! Please confirm your account.</h3>
                        <h4>Use the link to confirm account: </h4>
                        <a href="${config.activateUrl + activation_token}">${config.activateUrl + activation_token}</a>
                        <p>Thank you for using our application!</p>
                    `;
                    emailService.sendMail(req.body, mailContent)
                    .then(emailResult => {
                        return res.status(200).json({
                            message: 'Created successfully. An email is sent to your email address.',
                            user: user
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        return res.status(500).json({
                            error: err
                        });    
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

exports.activate = (req, res, next) => {
    User.findOne({activation_token: req.params.token}).exec()
    .then(user => {
        if (user) {
            user.activation_token = '';
            user.active = true;
            user.save()
                .then(result => {
                    console.log(result);
                    return res.status(200).json({
                        message: 'User is activated successfully',
                        user: user
                    });
                })
                .catch(err => {
                    console.log(err);
                    return res.status(500).json({
                        error: err
                    });
                }); 
        } else {
            return res.status(404).json({
                message: 'No valid entry for the provided token'
            });
        }
    })
    .catch(err => {
        console.log(err);
        return res.status(500).json({
            error: err
        });
    });
    return res.status(200).json({
        message: 'Activation successfull'
    });
};

/**
 * Login user and create token
 *
 * @param  [string] email
 * @param  [string] password
 * @return [string] message
 */
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
        if (!user.active) {
            return res.status(401).json({
                message: 'Login failed. Account not yet activated.'
            });
        }
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: 'Login failed. Incorrect email or password.'
                });
            }
            if (result) {

                const tokenConfig = {
                    username: user.email,
                    password: user.password,
                    scope: '<scope>',
                  };
                 
                  run(tokenConfig).then( function(response){
                      if (response) {
                        return res.status(200).json({
                            message: 'Login successfully',
                            user: user
                        });
                      } else {
                        return res.status(500).json({
                            message: 'token error',
                            user: user
                        });
                      }
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

async function run(tokenConfig) {
   
    try {
      const result = await oauth2.ownerPassword.getToken(tokenConfig);
      const accessToken = oauth2.accessToken.create(result);
    } catch (error) {
      console.log('Access Token Error', error.message);
    }
  }