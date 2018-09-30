'use strict';

// package references

import uuid from 'uuid';
import * as axios from 'axios';

// db options

const baseApiUrl = 'https://project-x-backend.herokuapp.com/api';
// const baseApiUrl = 'http://localhost:8000/api';

const getParticipants = ({ page, limit }) => {
  return new Promise((resolve, reject) => {
    const url = `${baseApiUrl}/list-participants?page=${page ||
      ''}&limit=${limit || ''}`;
    return axios
      .get(url)
      .then(result => {
        resolve(result.data);
      })
      .catch(error => {
        console.log(error);
        reject(error.message);
      });
  });
};

const deleteParticipant = participant => {
  return new Promise((resolve, reject) => {
    const url = `${baseApiUrl}/participant/${participant._id}`;
    return axios
      .delete(url)
      .then(result => {
        resolve(result.data);
      })
      .catch(error => {
        console.log(error);
        reject(error.message);
      });
  });
};

const addNew = ({
  name,
  surname,
  age,
  height,
  weight,
  email,
  qualificationLink,
  image
}) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    const url = `${baseApiUrl}/participant`;
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('age', age);
    formData.append('height', height);
    formData.append('weight', weight);
    formData.append('email', email);
    formData.append('qualificationLink', qualificationLink);
    formData.append('photo', image, `${uuid.v1()}.jpg`);

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };

    var reader = new FileReader();
    reader.onload = function(event) {
      // console.log(event.target.result); //event.target.results contains the base64 code to create the image.
      formData.append('photoBase64', event.target.result);
      return axios
        .post(url, formData, config)
        .then(result => {
          resolve(result.data);
        })
        .catch(error => {
          console.log(error);
          reject(error.message);
        });
    };
    reader.readAsDataURL(image); //Convert the blob from clipboard to base64
  });
};

module.exports = { getParticipants, addNew, deleteParticipant };
