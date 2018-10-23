// package references
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

// app references
const router = require('./routers/router');

// initialization
const PORT = process.env.PORT || 8000;

// configure server

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use('/photos', express.static(process.cwd() + '/photos'));
server.use(cors());
server.use(morgan('combined'));
server.use('/api', router(PORT));

// start server

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT} ...`);
});

module.exports = { server };
