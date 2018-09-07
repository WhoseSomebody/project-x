'use strict';

// package references
const express = require('express');
var formidable = require('formidable');

// app references
const NoteManager = require('../Services/NoteManager');
const EmailManager = require('../Services/EmailManager');

// initialization
const noteManager = new NoteManager();
const emailManager = new EmailManager();

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
    .get('/list-participants', (req, res) => {
      res.json({
        page: 1,
        pages: 1,
        limit: 12,
        participants: [
          {
            fullName: 'Иван Пупкин',
            age: 23,
            weight: 85,
            height: 193,
            image_url: 'https://picsum.photos/300/400'
          },
          {
            fullName: 'Иван Пупкин',
            age: 23,
            weight: 85,
            height: 193,
            image_url: 'https://picsum.photos/300/400'
          },
          {
            fullName: 'Иван Пупкин',
            age: 23,
            weight: 85,
            height: 193,
            image_url: 'https://picsum.photos/300/400'
          },
          {
            fullName: 'Иван Пупкин',
            age: 23,
            weight: 85,
            height: 193,
            image_url: 'https://picsum.photos/300/400'
          },
          {
            fullName: 'Иван Пупкин',
            age: 23,
            weight: 85,
            height: 193,
            image_url: 'https://picsum.photos/300/400'
          },
          {
            fullName: 'Иван Пупкин',
            age: 23,
            weight: 85,
            height: 193,
            image_url: 'https://picsum.photos/300/400'
          },
          {
            fullName: 'Иван Пупкин',
            age: 23,
            weight: 85,
            height: 193,
            image_url: 'https://picsum.photos/300/400'
          },
          {
            fullName: 'Иван Пупкин',
            age: 23,
            weight: 85,
            height: 193,
            image_url: 'https://picsum.photos/300/400'
          },
          {
            fullName: 'Иван Пупкин',
            age: 23,
            weight: 85,
            height: 193,
            image_url: 'https://picsum.photos/300/400'
          },
          {
            fullName: 'Иван Пупкин',
            age: 23,
            weight: 85,
            height: 193,
            image_url: 'https://picsum.photos/300/400'
          },
          {
            fullName: 'Иван Пупкин',
            age: 23,
            weight: 85,
            height: 193,
            image_url: 'https://picsum.photos/300/400'
          },
          {
            fullName: 'Иван Пупкин',
            age: 23,
            weight: 85,
            height: 193,
            image_url: 'https://picsum.photos/300/400'
          },
        ]
      });
    })
    .delete('/notes/:id', (request, response) => {
      const { id } = request.params;

      if (!id) {
        response.status(400).send('Title is required');
      } else {
        noteManager
          .removeNote(id)
          .then(() => response.status(200).send('Note deleted'))
          .catch(error => {
            console.log(error.message);
            response.status(500).send();
          });
      }
    })
    .get('/notes/:id', (request, response) => {
      const { id } = request.params;

      if (!id) {
        response.status(400).send('Id is required');
      } else {
        noteManager
          .findNoteById(id)
          .then(note => response.json(note))
          .catch(error => {
            console.log(error.message);
            response.status(500).send();
          });
      }
    })
    .get('/notes', (request, response) => {
      const { title, tag } = request.query;

      if (title) {
        noteManager
          .findNotesByTitle(title)
          .then(notes => response.json(notes))
          .catch(error => {
            console.log(error);
            response.status(500).send();
          });
      } else if (tag) {
        noteManager
          .findNotesByTag(tag)
          .then(notes => response.json(notes))
          .catch(error => {
            console.log(error);
            response.status(500).send();
          });
      } else {
        noteManager
          .listNotes()
          .then(notes => response.json(notes))
          .catch(error => {
            console.log(error);
            response.status(500).send();
          });
      }
    })
    .post('/notes', (request, response) => {
      console.log(request.body);
      const { title, content, tags } = request.body;

      if (!title) {
        response.status(400).send('Title is required');
      } else if (!content) {
        response.status(400).send('Content is required');
      } else {
        noteManager
          .addNote(title, content, tags)
          .then(id => response.status(201).send({ id: id }))
          .catch(error => {
            console.log(error.message);
            response.status(500).send(error.message);
          });
      }
    })
    .put('/notes', (request, response) => {
      const { id, title, content, tags } = request.body.note;

      if (!id) {
        response.status(400).send('Id is required');
      } else if (!title) {
        response.status(400).send('Title is required');
      } else if (!content) {
        response.status(400).send('Content is required');
      } else {
        noteManager
          .updateNote(id, title, content, tags)
          .then(() => response.status(200).send())
          .catch(error => {
            console.log(error.message);
            response.status(500).send(error.message);
          });
      }
    })
    .patch('/notes/:id', (request, response) => {
      // not an entirely correct use of patch but convenient
      // in terms of providing the 'tag' functionality

      const { id } = request.params;
      const { tags } = request.body;

      if (!id) {
        response.status(400).send('Id is required');
      } else if (!tags) {
        response.status(400).send('Tags is required');
      } else {
        noteManager
          .tagNote(id, tags)
          .then(() => response.status(200).send('Tagged note'))
          .catch(error => {
            console.log(error.message);
            response.status(500).send();
          });
      }
    });

  return router;
};

function collectRequestData(request, callback) {
  let body = '';
  request.on('data', chunk => {
    body += chunk.toString();
  });
  request.on('end', () => {
    console.log(parse(body));
    callback(parse(body));
  });
}

module.exports = notesRouter;
