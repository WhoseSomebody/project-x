'use strict';

// package references
const express = require('express');
var formidable = require('formidable');
var jwt = require('jwt-simple');

// app references
const EmailManager = require('../Services/EmailManager');
const ParticipantsManager = require('../Services/ParticipantsManager');

// initialization
const emailManager = new EmailManager();
const particiantsManager = new ParticipantsManager();

const getToken = () => {
  const payload = new Date()
    .toJSON()
    .slice(0, 10)
    .split('')
    .reverse()
    .join('')
    .replace(/-/g, '');
  const secret = toString(Math.PI * 10000000);
  console.log(secret);
  const token = jwt.encode(payload, secret);
  return token;
};
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

      if (req.get('Token') !== getToken()) res.status(400).send({ error: 'Wrong token' });
      // let formFields = {};
      return form.parse(req, function(err, fields) {
        if (err) res.status(500).send(err);

        return particiantsManager
          .addParticipant(fields)
          .then((id) => res.status(201).send({ id: id }))
          .catch((error) => {
            console.log(error);
            res.status(500).send(error);
          });
      });
    })
    .delete('/participant/:id', (req, res) => {
      const { id } = req.params;

      if (!id || req.get('Token') !== getToken()) {
        res.status(400).end();
      } else {
        particiantsManager
          .removeParticipant(id)
          .then(() => res.status(200).send('Participant deleted'))
          .catch((error) => {
            console.log(error.message);
            res.status(500).send();
          });
      }
    })
    .get('/list-participants', (req, res) => {
      const showFullData = req.get('Token') === getToken();
      return particiantsManager
        .listParticipants(req.query)
        .then((data) => {
          if (showFullData) return res.json(data);
          const { participants, count, pages, page, limit } = data;
          return res.json({
            participants: participants.map(
              ({ _id, name, surname, age, height, weight, qualificationLink, instagramLink, imageUrl }) => ({
                _id,
                name,
                surname,
                age,
                height,
                weight,
                qualificationLink,
                instagramLink,
                imageUrl,
              })
            ),
            count,
            pages,
            page,
            limit,
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).send(error);
        });
    })
    .post('/login', (req, res) => {
      const { login, password } = req.body;

      if (login === 'rdwcTeam2019' && password === '@N*verG1veUp,Dude:)') {
        const token = getToken();
        return res.json({
          token,
        });
      } else return res.status(400).send({ error: 'Wrong login & password.' });
    })
    .post('/is-logged-in', (req, res) => {
      const isLoggedIn = req.get('Token') === getToken();
      if (isLoggedIn) return res.status(200).end();
      else return res.status(400).end();
    });

  return router;
};

module.exports = notesRouter;
