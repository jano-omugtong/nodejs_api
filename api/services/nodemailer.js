const nodemailer = require('nodemailer');
const Q = require('q');

const config = require('../../config');


/**
 * Send email
 *
 * @param  [req.body] req
 * @param  [html] mailContent
 * @return reject or resolve
 */
exports.sendMail = (req, mailContent) => {
    let deferred = Q.defer();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.gmailUsername, // generated ethereal user
            pass: config.gmailPassword  // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Nodejs Api 👻" ' + config.gmailUsername, // sender address
        to: req.email, // list of receivers
        subject: "Account Confirmation ✔", // Subject line
        text: "Confirm Account", // plain text body
        html: mailContent // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            deferred.reject(error);
        }
        deferred.resolve();
    });

    return deferred.promise;

};
