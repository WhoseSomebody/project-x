'use strict';

// package references

import * as axios from 'axios';

// db options

const baseApiUrl = 'https://project-x-backend.herokuapp.com/api';

const sendFeedback = ({
  name,
  surname,
  age,
  height,
  weight,
  email,
  phone,
  qualificationLink,
  instagramLink,
  image
}) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    const url = `${baseApiUrl}/send-email`;
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('age', age);
    formData.append('height', height);
    formData.append('weight', weight);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('qualificationLink', qualificationLink);
    formData.append('instagramLink', instagramLink);
    formData.append('photo', image, `${name} ${surname} фото`);
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };
    return axios
      .post(url, formData, config)
      .then(result => {
        resolve(result.data);
      })
      .catch(error => {
        console.log(error);
        reject(error.message);
      });
    // axios
    //   .post(`${baseApiUrl}/send-email`, {
    //     title: title,
    //     content: content,
    //     tags: tags.join()
    //   })
    //   .then(result => {
    //     resolve(result.data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     reject(error.message);
    //   });
  });
};

module.exports = { sendFeedback };
