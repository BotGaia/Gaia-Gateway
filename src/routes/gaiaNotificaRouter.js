const axios = require('axios');

module.exports = {
  postNotification: (endpoint, json) => {
    return new Promise((resolve) => {
      axios.post(`http://192.168.25.10:3003/${endpoint}`, json).then((res) => {
        resolve(res.data);
      });
    });
  },
};
