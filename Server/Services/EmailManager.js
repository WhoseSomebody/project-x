'use strict';
const serverConfig = require('../serverConfig.js');
const nodemailer = require('nodemailer');
const fs = require('fs');

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

class EmailManager {
  sendEmail({ fields, files }) {
    console.log(fields);
    let mailOptions = {
      from: `"Project X" ${fields.email}` , // sender address
      to: 'whosesomebody@gmail.com', // list of receivers
      subject: 'Новый участник Project X', // Subject line
      // text: JSON.stringify(fields), // plain text body
      // html: `<b>${JSON.stringify(fields)}</b>`, // html body
      html: `
      <h2>Привет, к вам новый участник по проекту Икс!</h2>
      <table>        
        <tr>
          <td>Имя:</td>
          <td>${fields.name}</td>
        </tr>
        <tr>
          <td>Фамилия:</td>
          <td>${fields.surname}</td>
        </tr>
        <tr>
          <td>Возраст:</td>
          <td>${fields.age}</td>
        </tr>
        <tr>
          <td>Рост:</td>
          <td>${fields.height}</td>
        </tr>
        <tr>
          <td>Вес:</td>
          <td>${fields.weight}</td>
        </tr>
        <tr>
          <td>Email:</td>
          <td>${fields.email}</td>
        </tr>
        <tr>
          <td>Квалификация:</td>
          <td>${fields.qualificationLink}</td>
        </tr>
      </table>`, // html body
      attachments: [
        {
          content: files.photo,
          // path: files.photo.path,
          filename: 'image.jpg'
          // contentType: 'multipart/mixed'
        }
      ]
    };
    // console.log(fields)
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account

      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
    // });
  }
}

module.exports = EmailManager;
