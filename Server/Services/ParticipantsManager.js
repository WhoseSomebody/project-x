'use strict';

const ParticipantsRepository = require('../DataAccess/ParticipantsRepository');
const assert = require('assert');
const fs = require('fs');
const participantsRepository = new ParticipantsRepository();

const hostAddress = 'https://project-x-2018-frontend.herokuapp.com';

class ParticipantManager {
  addParticipant(fields) {
    const {
      name,
      surname,
      age,
      height,
      weight,
      email,
      qualificationLink,
      image
    } = fields;
    const imageUrl = hostAddress + '/photos/' + image.name;
    // assert(title, 'Title is required');
    // assert(content, 'Content is required');

    return new Promise((resolve, reject) => {
      participantsRepository
        .addParticipant({
          name,
          surname,
          age,
          height,
          weight,
          email,
          qualificationLink,
          imageUrl
        })
        .then(result => resolve(result.id))
        .catch(error => reject(error));
    });
  }

  listParticipants({ page, limit }) {
    return new Promise((resolve, reject) => {
      participantsRepository
        .listParticipants({ page: parseInt(page), limit: parseInt(limit) })
        .then(participants => resolve(participants))
        .catch(error => reject(error));
    });
  }

  removeParticipant(id) {
    assert(id, 'Id is required');

    return new Promise((resolve, reject) => {
      participantsRepository
        .removeParticipant(id)
        .then(() => resolve())
        .catch(error => reject(error));
    });
  }
}

module.exports = ParticipantManager;
