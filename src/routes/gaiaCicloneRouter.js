const axios = require('axios');

require('../config/environment');

module.exports = {
  getCycloneAlert: (id) => {
    const URL = `${global.URL_CYCLONE}/userCycloneAlert`;
    const params = {
      id,
    };
    return new Promise((resolve) => {
      axios.get(URL, { params })
        .then((res) => {
          resolve(res.data);
        }).catch((err) => {
          resolve(err);
        });
    });
  },

  deleteCycloneAlert: (telegramId) => {
    const URL = `${global.URL_CYCLONE}/deleteCycloneAlert`;
    const params = {
      id: telegramId,
    };

    return new Promise((resolve) => {
      axios.get(URL, { params })
        .then((res) => {
          resolve(res.data);
        }).catch((err) => {
          resolve(err.res.data);
        });
    });
  },

  postCycloneAlert: dataJson => new Promise((resolve) => {
    const URL = `${global.URL_CYCLONE}/createCycloneAlert`;

    axios.post(URL, dataJson).then((res) => {
      resolve(res.data);
    }).catch((err) => {
      resolve(err);
    });
  }),
};
