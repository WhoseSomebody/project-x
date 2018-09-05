'use strict';
const serverConfig = require('../serverConfig.js');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: serverConfig.gmail.client_user,
    clientId: serverConfig.gmail.client_id,
    clientSecret: serverConfig.gmail.secret,
    refreshToken: serverConfig.gmail.refresh_token,
    accessToken: serverConfig.gmail.access_token
  }
});
// setup email data with unicode symbols
    let mailOptions = {
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: 'whosesomebody@gmail.com', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: '<b>Hello world?</b>' // html body
    };

class EmailManager {
  sendEmail() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // nodemailer.createTestAccount((err, account) => {
    //   // create reusable transporter object using the default SMTP transport
    //   let transporter = nodemailer.createTransport({
    //     host: 'smtp.ethereal.email',
    //     port: 587,
    //     secure: false, // true for 465, false for other ports
    //     auth: {
    //       user: account.user, // generated ethereal user
    //       pass: account.pass // generated ethereal password
    //     }
    //   });

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
    // });
  }
}

module.exports = EmailManager;