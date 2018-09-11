'use strict';

const ParticipantsRepository = require('../DataAccess/ParticipantsRepository');
const assert = require('assert');
const fs = require('fs');
const participantsRepository = new ParticipantsRepository();

const hostAddress = 'http://192.168.0.100:8000';

class ParticipantManager {
  addParticipant(fields) {
    const {
      name,
      surname,
      age,
      height,
      weight,
      email,
      pullUpLink,
      muscleUpLink,
      pushUpLink,
      image
    } = fields;
    const imageUrl = hostAddress + '/photos/' + image.name;
    // assert(title, 'Title is required');
    // assert(content, 'Content is required');

    return new Promise((resolve, reject) => {
      participantsRepository
        .addParticipant({
          name: name,
          surname: surname,
          age: age,
          height: height,
          weight: weight,
          email: email,
          pullUpLink: pullUpLink,
          muscleUpLink: muscleUpLink,
          pushUpLink: pushUpLink,
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
