// package references
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

// app references
const notesRouter = require('./routers/notes-router');

// initialization
const PORT = process.env.PORT || 8000;

// configure server

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use('/public', express.static(process.cwd() + '/public'));
// server.use(express.static(__dirname + '/public'));
server.use(cors());
server.use(morgan('combined'));
server.use('/api', notesRouter(PORT));

// start server

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT} ...`);
});

module.exports = { server };
