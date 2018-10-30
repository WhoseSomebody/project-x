'use strict';

const ObjectID = require('mongodb').ObjectID;
const DbConnection = require('./DbConnection');

const collection = 'participants';

const connect = () =>
  new DbConnection(
    'mongodb://admin:ProjectX2018@ds145893-a0.mlab.com:45893,ds145893-a1.mlab.com:45893/rdwc?replicaSet=rs-ds145893'
  );

const filters = {
  id: id => {
    return { _id: new ObjectID(id) };
  },
  imageUrl: imageUrl => {
    return { imageUrl: { $regex: new RegExp(imageUrl, 'i') } };
  }
};

class ParticipantsRepository {
  addParticipant(participant) {
    const connection = connect();

    return new Promise((resolve, reject) => {
      connection
        .open()
        .then(() => {
          connection.Db.collection(collection)
            .insertOne({ ...participant, updated_date: Date.now() })
            .then(result => {
              connection.close();
              resolve({ id: result.insertedId });
            })
            .catch(error => {
              connection.close();
              reject(error);
            });
        })
        .catch(error => {
          reject(error);
          connection.close();
        });
    });
  }

  findParticipantById(id) {
    const connection = connect();

    return new Promise((resolve, reject) => {
      connection
        .open()
        .then(() => {
          connection.Db.collection(collection)
            .findOne(filters.id(id))
            .then(participant => {
              resolve(participant);
              connection.close();
            })
            .catch(error => {
              reject(error);
              connection.close();
            });
        })
        .catch(error => {
          reject(error);
          connection.close();
        });
    });
  }

  listParticipants({ page, limit }) {
    const connection = connect();

    return new Promise((resolve, reject) => {
      connection
        .open()
        .then(() => {
          connection.Db.collection(collection)
            .find()
            .sort({ updated_date: -1 })
            .skip(limit * page - limit)
            .limit(limit)
            .toArray()
            .then(participants => {
              connection.Db.collection(collection)
                .count()
                .then(count => {
                  resolve({
                    participants,
                    count,
                    pages: Math.ceil(count / limit),
                    page,
                    limit
                  });
                  connection.close();
                })
                .catch(error => {
                  reject(error);
                  connection.close();
                });
            })
            .catch(error => {
              reject(error);
              connection.close();
            });
        })
        .catch(error => reject(error));
    });
  }

  removeParticipant(id) {
    const connection = connect();

    return new Promise((resolve, reject) => {
      connection
        .open()
        .then(() => {
          connection.Db.collection(collection)
            .findOneAndDelete(filters.id(id))
            .then(() => {
              resolve();
              connection.close();
            })
            .catch(error => {
              reject(error);
              connection.close();
            });
        })
        .catch(error => {
          resolve(error);
          connection.close();
        });
    });
  }

  tagParticipant(id, tags) {
    const connection = connect();

    const update = {
      $addToSet: {
        tags: {
          $each: tags
        }
      }
    };

    return new Promise((resolve, reject) => {
      connection
        .open()
        .then(() => {
          connection.Db.collection(collection)
            .findOneAndUpdate(filters.id(id), update)
            .then(() => {
              resolve();
              connection.close();
            })
            .catch(error => {
              reject(error);
              connection.close();
            });
        })
        .catch(error => {
          reject(error);
          connection.close();
        });
    });
  }

  updateParticipant(id, participant) {
    const connection = connect();

    return new Promise((resolve, reject) => {
      connection
        .open()
        .then(() => {
          connection.Db.collection(collection)
            .update(filters.id(id), {
              $set: {
                title: participant.title,
                content: participant.content,
                tags: participant.tags,
                updated_date: participant.updated_date
              }
            })
            .then(() => {
              resolve();
              connection.close();
            })
            .catch(error => {
              reject(error);
              connection.close();
            });
        })
        .catch(error => {
          resolve(error);
          connection.close();
        });
    });
  }
}

module.exports = ParticipantsRepository;
