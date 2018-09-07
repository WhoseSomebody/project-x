'use strict';

// package references

import * as axios from 'axios';

// db options

const baseApiUrl = 'http://localhost:8000/api';

const getParticipants = ({ page, limit }) => {
  return new Promise((resolve, reject) => {
    const url = `${baseApiUrl}/list-participants`;
    return axios
      .get(url, { page, limit })
      .then(result => {
        resolve(result.data);
      })
      .catch(error => {
        console.log(error);
        reject(error.message);
      });
  });
};

module.exports = { getParticipants };
