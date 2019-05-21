const axios = require('axios');

module.exports = {
  postNotification: (endpoint, json) => new Promise((resolve) => {
    const URL = `${global.URL_NOTIFY}/${endpoint}`;

    axios.post(URL, json).then((res) => {
      resolve(res.data);
    }).catch(() => {
      resolve(JSON.parse('{"cod": 400}'));
    });
  }),
};
