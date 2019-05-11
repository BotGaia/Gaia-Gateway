const axios = require('axios');

module.exports = {
  postNotification: (endpoint, json) => new Promise((resolve) => {
    axios.post(`http://${process.env.IP_ADDRESS}:3003/${endpoint}`, json).then((res) => {
      resolve(res.data);
    }).catch(() => {
      resolve(JSON.parse('{"cod": 400}'));
    });
  }),
};
