'use strict';

// package references
const express = require('express');
var formidable = require('formidable');

// app references
const EmailManager = require('../Services/EmailManager');
const ParticipantsManager = require('../Services/ParticipantsManager');

// initialization
const emailManager = new EmailManager();
const particiantsManager = new ParticipantsManager();

// build router

const notesRouter = () => {
  const router = express.Router();

  router
    .post('/send-email', (req, res) => {
      var form = new formidable.IncomingForm();
      form.parse(req, function(err, fields, files) {
        emailManager.sendEmail({ fields, files });
        res.writeHead(200);
        res.end();
      });
    })
    .post('/participant', (req, res) => {
      var form = new formidable.IncomingForm();
      let formFields = {};
      return form
        .parse(req)
        .on('field', function(name, val) {
          formFields[name] = val;
        })
        .on('fileBegin', function(name, file) {
          file.path = process.cwd() + '/photos/' + file.name;
          // file.path = file.toString('base64');
        })
        .on('file', function(name, file) {
          formFields.image = file;
          return particiantsManager
            .addParticipant(formFields)
            .then(id => res.status(201).send({ id: id }))
            .catch(error => {
              console.log(error);
              res.status(500).send(error);
            });
        });
    })
    .delete('/participant/:id', (req, res) => {
      const { id } = req.params;
      if (!id) {
        res.status(400).send('Id is required');
      } else {
        particiantsManager
          .removeParticipant(id)
          .then(() => res.status(200).send('Participant deleted'))
          .catch(error => {
            console.log(error.message);
            res.status(500).send();
          });
      }
    })
    .get('/list-participants', (req, res) => {
      return particiantsManager
        .listParticipants(req.query)
        .then(participants => res.json(participants))
        .catch(error => {
          console.log(error);
          res.status(500).send(error);
        });
    });

  return router;
};

module.exports = notesRouter;
